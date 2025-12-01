import { useEffect, useState } from 'react';

interface FormationConfigProps {
    numRows: number;
    setNumRows: (rows: number) => void;
    columnsPerRow: { [key: number]: number };
    setColumnsPerRow: (cols: { [key: number]: number }) => void;
}

const generateColumnInputValue = (numRows: number, columnsPerRow: { [key: number]: number }) => {
    return Object.fromEntries(
        Array.from({ length: numRows }, (_, i) => i + 1).map(rowNum => [
            rowNum,
            columnsPerRow[rowNum]?.toString() || '1'
        ])
    )
}

function FormationConfig({ numRows, setNumRows, columnsPerRow, setColumnsPerRow }: FormationConfigProps) {
    const [columnInputValue, setColumnInputValue] = useState<{ [key: number]: string }>(generateColumnInputValue(numRows, columnsPerRow));
    const [columnInputError, setColumnInputError] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        setColumnInputValue(generateColumnInputValue(numRows, columnsPerRow));
    }, [numRows, columnsPerRow]);

    return (
        <div className="p-3 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Formation</h3>

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
                        for (let i = 1; i <= newNumRows; i++) {
                            if (!newCols[i]) {
                                newCols[i] = 1;
                            }
                        }
                        setColumnsPerRow(newCols);
                        setNumRows(newNumRows);
                    }}
                    className="w-full h-1"
                />
            </div>

            {/* Columns per Row */}
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Columns per Row</label>
                <div className="space-y-1.5">
                    {Array.from({ length: numRows }, (_, i) => i + 1).map((rowNum) => (
                        <div key={rowNum} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 w-12">Row {rowNum}:</span>
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
    );
}

export default FormationConfig;
