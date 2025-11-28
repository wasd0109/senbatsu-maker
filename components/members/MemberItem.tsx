import React, { useEffect, useRef, useState } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import ImageCard from '../ImageCard'

interface MemberItemProps {
    member: Member;
    onClick?: () => void;
    setIsSidebarOpen: (isOpen: boolean) => void
}

function MemberItem({
    member,
    onClick,
    setIsSidebarOpen
}: MemberItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<boolean>(false);

    useEffect(() => {
        const el = ref.current;

        if (el) {
            return draggable({
                element: el,
                getInitialData: () => ({ member }),
                onDragStart: () => {
                    setDragging(true);
                    setIsSidebarOpen(false)
                },
                onDrop: () => setDragging(false),
            });
        }
    }, [member, setIsSidebarOpen]);
    return (
        <ImageCard
            className={dragging ? 'opacity-50' : ''}
            ref={ref}
            imageSrc={member.imageSrc || ""}
            title={member.name}
            subtitle={member.group}
            alt={member.name}
            onClick={onClick}
        />
    )
}

export default MemberItem