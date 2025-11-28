import { useState } from 'react';
import { StaticImageData } from 'next/image';
import ImageCard from '@/components/ImageCard';
import MemberList from './MemberList';
import { calculateColorWithAlpha } from '@/lib/utils/colorUtils';

interface MemberSidebarProps {
    memberData: { [key: string]: Member[] };
    groupMetadata: { [key: string]: { logo: StaticImageData; color: string } };
    numRows: number;
    setNumRows: (rows: number) => void;
    columnsPerRow: { [key: number]: number };
    setColumnsPerRow: (cols: { [key: number]: number }) => void;
}

function MemberSidebar({ memberData, groupMetadata, numRows, setNumRows, columnsPerRow, setColumnsPerRow }: MemberSidebarProps) {
    const [showMemberList, setShowMemberList] = useState(Object.fromEntries(Object.keys(memberData).map(group => [group, false])));
    const [groupByGeneration, setGroupByGeneration] = useState(true);
    const [showGraduated, setShowGraduated] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-lg border border-gray-200"
                aria-label="Toggle menu"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {isSidebarOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50  z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                flex flex-col
                w-80 shrink-0 border-r border-gray-200 overflow-y-auto p-6 bg-gray-50
                fixed lg:static inset-y-0 left-0 z-40
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <h2 className="text-xl font-bold md:mt-10 mb-4">Groups</h2>
                <div className="mb-4 px-2 space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <input
                            type="checkbox"
                            checked={groupByGeneration}
                            onChange={(e) => setGroupByGeneration(e.target.checked)}
                            className="rounded"
                        />
                        Group by generation
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <input
                            type="checkbox"
                            checked={showGraduated}
                            onChange={(e) => setShowGraduated(e.target.checked)}
                            className="rounded"
                        />
                        Show graduated
                    </label>
                </div>


                {Object.keys(memberData).map((groupName) => {
                    return (
                        <div key={groupName} className="mb-4">
                            <ImageCard
                                selected={showMemberList[groupName]}
                                selectedColor={calculateColorWithAlpha(groupMetadata[groupName].color, 0.3)}
                                fit="contain"
                                imageSrc={groupMetadata[groupName].logo}
                                title={groupName}
                                onClick={() => { setShowMemberList(prevState => ({ ...prevState, [groupName]: !prevState[groupName] })) }}
                            />
                            {showMemberList[groupName] && (
                                <MemberList
                                    members={memberData[groupName]}
                                    groupByGeneration={groupByGeneration}
                                    showGraduated={showGraduated}
                                    setIsSidebarOpen={setIsSidebarOpen}
                                />
                            )}
                        </div>
                    )
                })}

                {/* Formation Configuration */}
                <div className="mt-auto mb-4 p-3 bg-white rounded-lg border border-gray-200">
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
                                <div key={rowNum} className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 w-12">Row {rowNum}:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max="15"
                                        value={columnsPerRow[rowNum] || 1}
                                        onChange={(e) => {
                                            const newCols = { ...columnsPerRow };
                                            newCols[rowNum] = parseInt(e.target.value) || 1;
                                            setColumnsPerRow(newCols);
                                        }}
                                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default MemberSidebar;
