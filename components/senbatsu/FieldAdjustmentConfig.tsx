import { useSenbatsuStyle } from '@/contexts/SenbatsuStyleContext';
import { useState } from 'react';

function FieldAdjustmentConfig() {
    const { selectedStyle, updateStyleProperty } = useSenbatsuStyle();
    const [isOpen, setIsOpen] = useState(false);

    const offset = selectedStyle.senbatsuFieldOffset || { x: 0, y: 0 };
    const scale = selectedStyle.senbatsuFieldScale || 1;
    const overlapGap = selectedStyle.senbatsuItemOverlapGap || { x: 25, y: 10 };
    const hasOverlap = selectedStyle.senbatsuItemOverlap === true;
    const staggerEnabled = selectedStyle.senbatsuFieldStaggerEnabled ?? false;

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            {/* Header with toggle button */}
            <div className="flex items-center justify-between p-3 pb-0 mb-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Field Adjustment</h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label={isOpen ? "Hide controls" : "Show controls"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-gray-600 transition-transform ${isOpen ? '' : 'rotate-180'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Mobile: Horizontal Layout */}
            {isOpen && (
                <div className="p-3 pt-3">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        {/* X Offset */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                X: {offset.x}px
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
                                Y: {offset.y}px
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
                                Scale: {scale.toFixed(2)}
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

                        {/* Overlap Gap Controls - Only show if overlap is enabled */}
                        {hasOverlap && (
                            <>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Gap X: {overlapGap.x}px
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
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
                                        Gap Y: {overlapGap.y}px
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
                            </>
                        )}
                    </div>

                    {/* Reset Button - Mobile */}
                    <button
                        onClick={() => {
                            updateStyleProperty('senbatsuFieldOffset', { x: 0, y: 0 });
                            updateStyleProperty('senbatsuFieldScale', 1);
                            updateStyleProperty('senbatsuFieldStaggerEnabled', true);
                            if (hasOverlap) {
                                updateStyleProperty('senbatsuItemOverlapGap', { x: 25, y: 10 });
                            }
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                    >
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
}

export default FieldAdjustmentConfig;
