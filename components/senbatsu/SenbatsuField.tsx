import React from 'react'
import SenbatsuItem from './SenbatsuItem';
import { useSenbatsuStyle } from '@/contexts/SenbatsuStyleContext';
import { calculateZIndex } from '@/lib/utils/zIndexUtils';

interface SenbatsuFieldProps {
    senbatsuMembers: { [rowIndex: number]: { [colIndex: number]: SenbatsuGridItem } }
    numRows: number
    columnsPerRow: { [key: number]: number }
}

function SenbatsuField({ senbatsuMembers, numRows, columnsPerRow }: SenbatsuFieldProps) {
    const { selectedStyle } = useSenbatsuStyle();
    const row = numRows;
    const column = columnsPerRow;
    const shouldOverlap = selectedStyle.senbatsuItemOverlap === true;

    // Get offset from selected style, default to {x: 0, y: 0} if not defined
    const offset = selectedStyle.senbatsuFieldOffset || { x: 0, y: 0 };

    // Get scale from selected style, default to 1 if not defined
    const scale = selectedStyle.senbatsuFieldScale || 1;

    // Get stagger enabled from selected style, default to false if not defined
    const staggerEnabled = selectedStyle.senbatsuFieldStaggerEnabled ?? false;

    // Apply offset and scale: positive x = right, negative x = left, positive y = up, negative y = down
    const transformStyle = `translate(${offset.x}px, ${offset.y}px) scale(${scale})`;

    return (
        <div className='flex flex-col-reverse' style={{ transform: transformStyle }}>
            {Array.from(Array(row)).map((_, rowIndex) => {
                // Calculate stagger offset - alternating rows are shifted by half the item width
                const itemWidth = selectedStyle.senbatsuItemSize.width;
                const overlapOffset = shouldOverlap ? 50 : 0; // Account for the overlap margin
                const staggerOffset = staggerEnabled && rowIndex % 2 === 1 ? (itemWidth - overlapOffset) / 2 : 0;
                const numColumns = columnsPerRow[rowIndex];

                return (
                    <div
                        key={rowIndex}
                        className='flex justify-center flex-nowrap'
                        style={{
                            marginBottom: shouldOverlap ? '-50px' : '1px',
                            marginLeft: `${staggerOffset}px`,
                            height: "100%",
                        }}
                    > {
                            Array.from(Array(numColumns)).map((_, colIndex) =>
                                <SenbatsuItem key={`${rowIndex}-${colIndex}`} member={senbatsuMembers[rowIndex]?.[colIndex]} rowIndex={rowIndex} colIndex={colIndex} zIndex={calculateZIndex(rowIndex, colIndex, numRows, numColumns)} />
                            )
                        } </div>
                );
            })}
        </div>
    )

}

export default SenbatsuField