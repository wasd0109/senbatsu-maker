import React from 'react'
import SenbatsuItem from './SenbatsuItem';

interface SenbatsuFieldProps {
    senbatsuMembers: { [rowIndex: number]: { [colIndex: number]: Member } }
}

function SenbatsuField({ senbatsuMembers }: SenbatsuFieldProps) {
    const row = 3;
    const column: { [key: number]: number } = { 1: 3, 2: 7, 3: 7 }
    return (
        <div className="space-y-1 sm:space-y-2">
            {Array.from(Array(row)).map((_, rowIndex) => (
                <div key={rowIndex} className='flex justify-center flex-nowrap gap-0.5 sm:gap-1'> {
                    Array.from(Array(column[row - rowIndex])).map((_, colIndex) => (
                        <SenbatsuItem key={`${rowIndex}-${colIndex}`} member={senbatsuMembers[rowIndex][colIndex]} rowIndex={rowIndex} colIndex={colIndex} />
                    ))
                } </div>
            ))}
        </div>
    )

}

export default SenbatsuField