import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { getMemberImagePath } from '@/lib/utils/memberImageUtils';
import { useSenbatsuStyle } from '@/contexts/SenbatsuStyleContext';

interface SenbatsuItemProps {
    rowIndex: number;
    colIndex: number;
    member: SenbatsuGridItem;
    zIndex: number;
}

function SenbatsuItem({ rowIndex, colIndex, member, zIndex }: SenbatsuItemProps) {
    const { selectedStyle } = useSenbatsuStyle();
    const droppableRef = useRef<HTMLDivElement>(null);
    const draggableRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [dragging, setDragging] = useState<boolean>(false);
    const isRectangular = selectedStyle.senbatsuItemShape === 'rectangular';
    const shouldOverlap = selectedStyle.senbatsuItemOverlap === true;
    const overlapGap = selectedStyle.senbatsuItemOverlapGap || { x: 25, y: 10 };
    const itemWidth = selectedStyle.senbatsuItemSize?.width;
    const itemHeight = isRectangular ? selectedStyle.senbatsuItemSize?.height : selectedStyle.senbatsuItemSize?.width

    // Alternating pattern for better visibility when overlapped
    const isEven = colIndex % 2 === 0;

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

        if (draggableEl && member) {
            return draggable({
                element: draggableEl,
                getInitialData: () => ({ member }),
                onDragStart: () => setDragging(true),
                onDrop: () => setDragging(false),
            });
        }
    }, [member])

    // Define alternating styles for empty slots when overlapped
    const emptySlotStyle = !member ? {
        border: isEven ? '2px dashed rgba(0, 0, 0, 0.4)' : '2px dashed rgba(30, 64, 175, 0.6)',
        backgroundColor: isEven ? 'rgba(0, 0, 0, 0.2)' : 'rgba(30, 64, 175, 0.3)',
        boxShadow: isEven
            ? '0 2px 4px rgba(0, 0, 0, 0.3)'
            : '0 2px 4px rgba(30, 64, 175, 0.4)',
    } : {};


    return (
        <div
            className={`relative flex flex-col items-center justify-center first:ml-0`}
            style={{
                position: 'relative',
                gap: shouldOverlap ? undefined : '1px',
                marginLeft: shouldOverlap && colIndex > 0 ? `-${overlapGap.x}px` : undefined,
                marginTop: shouldOverlap ? `-${overlapGap.y}px` : undefined,
                marginBottom: shouldOverlap ? `-${overlapGap.y}px` : undefined,
                width: itemWidth,
                height: itemHeight,
            }}
        >
            {/* Slot container - works for both occupied and empty slots */}
            <div
                style={{
                    ...selectedStyle.senbatsuItemSize,
                    ...emptySlotStyle,
                }}
                className={`relative transition-all duration-200 flex items-center justify-center ${member && dragging ? "opacity-50" : ""} ${isDraggedOver ? "bg-gray-500 opacity-30" : ""}
                    ${!member && !shouldOverlap ? 'border border-gray-300' : ''}
                    ${!isRectangular ? 'rounded-full' : ""}`}
                ref={member ? draggableRef : droppableRef}
            >
                {member ? (
                    // Occupied slot - show member image
                    <Image
                        draggable="false"
                        ref={imageRef}
                        src={getMemberImagePath(member, { withBackground: false })}
                        fill
                        alt={member.name}
                        style={{
                            objectFit: 'cover',
                            objectPosition: isRectangular ? 'center' : 'top',
                            zIndex: zIndex,
                        }}
                    />
                ) : (
                    // Empty slot - show placeholder
                    <h1 className="text-white text-xs opacity-50">
                        {colIndex + 1}
                    </h1>
                )}
            </div>

            {/* Member name (commented out)
            {member && (
                <div className="mt-2 text-center text-sm font-medium text-white drop-shadow-lg">
                    {member.name}
                </div>
            )} */}
        </div>
    )
}

export default SenbatsuItem