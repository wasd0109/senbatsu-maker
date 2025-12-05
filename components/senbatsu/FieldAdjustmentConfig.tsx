import { useSenbatsuStyle } from '@/contexts/SenbatsuStyleContext';
import { useState, useEffect } from 'react';

interface FieldAdjustmentConfigProps {
    numRows: number;
    setNumRows: (rows: number) => void;
    columnsPerRow: { [key: number]: number };
    setColumnsPerRow: (cols: { [key: number]: number }) => void;
}

const generateColumnInputValue = (numRows: number, columnsPerRow: { [key: number]: number }) => {
    return Object.fromEntries(
        Array.from({ length: numRows }, (_, i) => i).map(rowNum => [
            rowNum,
            columnsPerRow[rowNum]?.toString() || '1'
        ])
    )
}

function FieldAdjustmentConfig({ numRows, setNumRows, columnsPerRow, setColumnsPerRow }: FieldAdjustmentConfigProps) {
    const { selectedStyle, setSelectedStyle, senbatsuStyle, updateStyleProperty } = useSenbatsuStyle();
    const [selectedStyleValue, setSelectedStyleValue] = useState<string>(selectedStyle.value);
    const [isDetailedSettingsOpen, setIsDetailedSettingsOpen] = useState(false);
    const [isFieldConfigOpen, setIsFieldConfigOpen] = useState(false);
    const [isBgConfigOpen, setIsBgConfigOpen] = useState(false);
    const [isFormationConfigOpen, setIsFormationConfigOpen] = useState(false);
    const [columnInputValue, setColumnInputValue] = useState<{ [key: number]: string }>(generateColumnInputValue(numRows, columnsPerRow));
    const [columnInputError, setColumnInputError] = useState<{ [key: number]: string }>({});

    const offset = selectedStyle.senbatsuFieldOffset || { x: 0, y: 0 };
    const scale = selectedStyle.senbatsuFieldScale || 1;
    const overlapGap = selectedStyle.senbatsuItemOverlapGap || { x: 25, y: 10 };
    const bgOffset = selectedStyle.backgroundImageOffset || { x: 0, y: 0 };
    const bgScale = selectedStyle.backgroundImageScale || 1;

    useEffect(() => {
        setColumnInputValue(generateColumnInputValue(numRows, columnsPerRow));
    }, [numRows, columnsPerRow]);

    return (
        <div className="p-3 bg-white rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Adjustment</h3>

            {/* Mobile: Horizontal Layout */}
            <div className="">
                {/* Style Selection */}
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                    <label className="text-xs font-semibold text-gray-700 whitespace-nowrap">Style:</label>
                    <select
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                        value={selectedStyle.value}
                        onChange={(e) => {
                            setSelectedStyle(senbatsuStyle[e.target.value])
                            setSelectedStyleValue(e.target.value);
                        }}
                    >
                        {senbatsuStyle && Object.keys(senbatsuStyle).map((styleKey) => (
                            <option key={styleKey} value={styleKey}>
                                {senbatsuStyle[styleKey].label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Detailed Settings Section */}
                <button
                    onClick={() => setIsDetailedSettingsOpen(!isDetailedSettingsOpen)}
                    className="w-full flex items-center justify-between text-xs font-semibold mb-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <span>Detailed Settings</span>
                    <span className="text-lg">{isDetailedSettingsOpen ? '−' : '+'}</span>
                </button>

                {isDetailedSettingsOpen && (
                    <div>
                        {/* Formation Configuration Section */}
                        <button
                            onClick={() => setIsFormationConfigOpen(!isFormationConfigOpen)}
                            className="w-full flex items-center justify-between text-xs font-semibold mb-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <span>Formation</span>
                            <span className="text-lg">{isFormationConfigOpen ? '−' : '+'}</span>
                        </button>

                        {isFormationConfigOpen && (
                            <div className="mb-3">
                                {/* Number of Rows */}
                                <div className="mb-3">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Rows: {numRows}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={numRows}
                                        onChange={(e) => {
                                            const newNumRows = parseInt(e.target.value);
                                            // Add default columns for new rows
                                            const newCols = { ...columnsPerRow };
                                            for (let i = 0; i < newNumRows; i++) {
                                                if (!newCols[i]) {
                                                    newCols[i] = 1;
                                                }
                                            }
                                            setNumRows(newNumRows);
                                            setColumnsPerRow(newCols);
                                        }}
                                        className="w-full h-1"
                                    />
                                </div>

                                {/* Columns per Row */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Columns per Row</label>
                                    <div className="grid grid-cols-2 md:flex gap-4 space-y-1.5">
                                        {Array.from({ length: numRows }, (_, i) => i).map((rowNum) => (
                                            <div key={rowNum} className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500 w-12">Row {rowNum + 1}:</span>
                                                    <input
                                                        type="text"
                                                        className={`${columnInputError[rowNum] ? 'border-red-500' : 'border-gray-300'} flex-1 px-2 py-1 border rounded text-xs`}
                                                        value={columnInputValue[rowNum]}
                                                        onChange={(e) => {
                                                            const num = parseInt(e.target.value);
                                                            setColumnInputValue(prev => ({ ...prev, [rowNum]: e.target.value }));
                                                            if (num < 1 || isNaN(num)) {
                                                                setColumnInputError(prev => ({ ...prev, [rowNum]: 'Must be a number greater than 0' }));
                                                            } else if (num > 10) {
                                                                setColumnInputError(prev => ({ ...prev, [rowNum]: 'Maximum 10 columns allowed' }));
                                                            }
                                                            else if (!isNaN(num)) {
                                                                const newCols = { ...columnsPerRow };
                                                                newCols[rowNum] = parseInt(e.target.value) || 1;
                                                                setColumnsPerRow(newCols);
                                                                setColumnInputError(prev => {
                                                                    const newErrors = { ...prev };
                                                                    delete newErrors[rowNum];
                                                                    return newErrors;
                                                                });
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {columnInputError[rowNum] && (
                                                    <span className="text-xs text-red-500 ml-14">{columnInputError[rowNum]}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Senbatsu Field Section Header */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setIsFieldConfigOpen(!isFieldConfigOpen)}
                                className="w-full flex items-center justify-between text-xs font-semibold mb-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <span>Senbatsu Field</span>
                                <span className="text-lg">{isFieldConfigOpen ? '−' : '+'}</span>
                            </button>

                            {isFieldConfigOpen && (
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    {/* X Offset */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Horizontal position: {offset.x}px
                                        </label>
                                        <input
                                            type="range"
                                            min="-500"
                                            max="500"
                                            value={offset.x}
                                            onChange={(e) => {
                                                const newX = parseInt(e.target.value);
                                                updateStyleProperty('senbatsuFieldOffset', { ...offset, x: newX });
                                            }}
                                            className="w-full h-1"
                                        />
                                    </div>

                                    {/* Y Offset */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Vertical position: {offset.y}px
                                        </label>
                                        <input
                                            type="range"
                                            min="-500"
                                            max="500"
                                            value={offset.y}
                                            onChange={(e) => {
                                                const newY = parseInt(e.target.value);
                                                updateStyleProperty('senbatsuFieldOffset', { x: offset.x, y: newY });
                                            }}
                                            className="w-full h-1"
                                        />
                                    </div>

                                    {/* Scale */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Field size: {scale.toFixed(2)}
                                        </label>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="2"
                                            step="0.05"
                                            value={scale}
                                            onChange={(e) => {
                                                const newScale = parseFloat(e.target.value);
                                                updateStyleProperty('senbatsuFieldScale', newScale);
                                            }}
                                            className="w-full h-1"
                                        />
                                    </div>

                                    {/* Item Shape Toggle */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Member Shape
                                        </label>
                                        <button
                                            onClick={() => {
                                                const newShape = selectedStyle.senbatsuItemShape === 'rectangular' ? 'circular' : 'rectangular';
                                                updateStyleProperty('senbatsuItemShape', newShape);
                                            }}
                                            className="w-full px-3 py-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors font-medium"
                                        >
                                            {selectedStyle.senbatsuItemShape === 'rectangular' ? 'Rectangle' : 'Rounded'}
                                        </button>
                                    </div>

                                    {/* Overlap Gap Controls*/}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Member overlap: {overlapGap.x}px
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="50"
                                            value={overlapGap.x}
                                            onChange={(e) => {
                                                const newX = parseInt(e.target.value);
                                                updateStyleProperty('senbatsuItemOverlapGap', { ...overlapGap, x: newX });
                                            }}
                                            className="w-full h-1"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Row overlap: {overlapGap.y}px
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="50"
                                            value={overlapGap.y}
                                            onChange={(e) => {
                                                const newY = parseInt(e.target.value);
                                                updateStyleProperty('senbatsuItemOverlapGap', { x: overlapGap.x, y: newY });
                                            }}
                                            className="w-full h-1"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Background Image Adjustment Section */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setIsBgConfigOpen(!isBgConfigOpen)}
                                className="w-full flex items-center justify-between text-xs font-semibold mb-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <span>Background Image</span>
                                <span className="text-lg">{isBgConfigOpen ? '−' : '+'}</span>
                            </button>

                            {isBgConfigOpen && (
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Background X Offset */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Horizontal position: {bgOffset.x}px
                                        </label>
                                        <input
                                            type="range"
                                            min="-500"
                                            max="500"
                                            value={bgOffset.x}
                                            onChange={(e) => {
                                                const newX = parseInt(e.target.value);
                                                updateStyleProperty('backgroundImageOffset', { ...bgOffset, x: newX });
                                            }}
                                            className="w-full h-1"
                                        />
                                    </div>

                                    {/* Background Y Offset */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Vertical position: {bgOffset.y}px
                                        </label>
                                        <input
                                            type="range"
                                            min="-500"
                                            max="500"
                                            value={bgOffset.y}
                                            onChange={(e) => {
                                                const newY = parseInt(e.target.value);
                                                updateStyleProperty('backgroundImageOffset', { x: bgOffset.x, y: newY });
                                            }}
                                            className="w-full h-1"
                                        />
                                    </div>

                                    {/* Background Scale */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Size: {bgScale.toFixed(2)}
                                        </label>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="3"
                                            step="0.1"
                                            value={bgScale}
                                            onChange={(e) => {
                                                const newScale = parseFloat(e.target.value);
                                                updateStyleProperty('backgroundImageScale', newScale);
                                            }}
                                            className="w-full h-1"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reset Button */}
                        <button
                            onClick={() => {
                                setSelectedStyle(senbatsuStyle[selectedStyleValue]);
                            }}
                            className="w-full mt-6 px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FieldAdjustmentConfig;
