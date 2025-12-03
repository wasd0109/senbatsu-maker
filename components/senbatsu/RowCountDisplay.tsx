interface RowCountDisplayProps {
    numRows: number;
    columnsPerRow: { [key: number]: number };
}

function RowCountDisplay({ numRows, columnsPerRow }: RowCountDisplayProps) {
    // Calculate total slots
    const totalSlots = Object.values(columnsPerRow).reduce((sum, count) => sum + count, 0);

    return (
        <div className="flex flex-col items-center justify-center bg-[#742F76] text-white rounded-sm w-5 min-h-10 text-sm">
            {Array.from({ length: numRows }, (_, index) => {
                const columnCount = columnsPerRow[index] || 0;
                return (
                    <h1 key={index} className='border-b-1'>{columnCount}</h1>
                );
            })}

            {totalSlots}
        </div>
    );
}

export default RowCountDisplay;
