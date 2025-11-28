import React, { useEffect, useRef, useState } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import ImageCard from '../ImageCard'

interface MemberItemProps {
    member: Member;
    onClick?: () => void
}

function MemberItem({
    member,
    onClick
}: MemberItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<boolean>(false);

    useEffect(() => {
        const el = ref.current;

        if (el) {
            return draggable({
                element: el,
                getInitialData: () => ({ member }),
                onDragStart: () => setDragging(true),
                onDrop: () => setDragging(false),
            });
        }
    }, [member]);
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