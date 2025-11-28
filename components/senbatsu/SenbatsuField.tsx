import React from 'react'
import SenbatsuItem from './SenbatsuItem';

interface SenbatsuFieldProps {
    senbatsuMembers: { [rowIndex: number]: { [colIndex: number]: { name: string; graduated?: boolean; groupName?: string; imageSrc: string | StaticImageData } } }
}

function SenbatsuField({ senbatsuMembers }: SenbatsuFieldProps) {
    const row = 3;
    const column: { [key: number]: number } = { 1: 3, 2: 7, 3: 7 }
    return Array.from(Array(row)).map((_, rowIndex) => (
        <div key={rowIndex} className='flex justify-center'> {
            Array.from(Array(column[row - rowIndex])).map((_, colIndex) => (
                <SenbatsuItem key={`${rowIndex}-${colIndex}`} member={senbatsuMembers[rowIndex][colIndex]} rowIndex={rowIndex} colIndex={colIndex} />
            ))
        } </div>
    ))

}

export default SenbatsuField