import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

interface SenbatsuItemProps {
    rowIndex: number;
    colIndex: number;
    member: SenbatsuGridItem;
}

function SenbatsuItem({ rowIndex, colIndex, member }: SenbatsuItemProps) {
    const droppableRef = useRef<HTMLDivElement>(null);
    const draggableRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [dragging, setDragging] = useState<boolean>(false);

    useEffect(() => {
        const droppableEl = droppableRef.current;

        if (droppableEl) {
            return dropTargetForElements({
                element: droppableEl,
                onDragEnter: () => setIsDraggedOver(true),
                onDragLeave: () => setIsDraggedOver(false),
                onDrop: () => setIsDraggedOver(false),
                getData: () => ({ location: { rowIndex, colIndex }, member })
            });
        }
    }, [member, rowIndex, colIndex]);

    useEffect(() => {
        const draggableEl = draggableRef.current;

        if (draggableEl) {
            return dropTargetForElements({
                element: draggableEl,
                onDragEnter: () => setIsDraggedOver(true),
                onDragLeave: () => setIsDraggedOver(false),
                onDrop: () => setIsDraggedOver(false),
                getData: () => ({ location: { rowIndex, colIndex }, member })
            });
        }
    }, [colIndex, member, rowIndex])

    useEffect(() => {
        const draggableEl = draggableRef.current;

        if (draggableEl) {
            return draggable({
                element: draggableEl,
                getInitialData: () => ({ member }),
                onDragStart: () => setDragging(true),
                onDrop: () => setDragging(false),
            });
        }
    }, [member])
    if (member) {
        return (
            <div className="relative m-0.5 sm:m-1" key={`${rowIndex}-${colIndex}`}>
                {/* Circular shadow beneath */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 sm:w-20 h-3 sm:h-5 rounded-[50%] bg-black/30 blur-md"></div>

                {/* Member card */}
                <div className={`${dragging ? "opacity-50" : ""} ${isDraggedOver ? "bg-gray-500 opacity-30" : ""} border border-gray-300 w-[60px] sm:w-20 md:w-[100px] h-24 sm:h-32 md:h-40 relative z-10`} ref={draggableRef}>
                    <Image draggable="false" ref={imageRef} src={member.imageSrc} fill alt={member.name} className="object-cover" />
                </div>
            </div>
        )
    }

    return (
        <div className={`${isDraggedOver ? "bg-gray-500 opacity-30" : ""} border border-gray-300 w-[60px] sm:w-20 md:w-[100px] h-24 sm:h-32 md:h-40 mx-0.5 sm:mx-1 my-1 sm:my-2`} ref={droppableRef} key={`${rowIndex}-${colIndex}`}></div>
    )
}

export default SenbatsuItem