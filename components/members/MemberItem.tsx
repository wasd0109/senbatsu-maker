import React, { useEffect, useRef, useState } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import image from "@/assets/members/1000_1000_102400.jpg"
import { StaticImageData } from 'next/image'
import ImageCard from '../ImageCard'

interface MemberItemProps {
    member: { name: string; graduated?: boolean; groupName?: string; imageSrc?: StaticImageData | string };
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
    }, []);
    return (
        <ImageCard
            className={dragging ? 'opacity-50' : ''}
            ref={ref}
            imageSrc={member.imageSrc || ""}
            title={member.name}
            subtitle={member.groupName}
            alt={member.name}
            onClick={onClick}
        />
    )
}

export default MemberItem