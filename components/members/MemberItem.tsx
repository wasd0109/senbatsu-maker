import React, { useEffect, useRef, useState } from 'react'
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import ImageCard from '../ImageCard'
import { BiMenu, BiPlus } from 'react-icons/bi';
import { getMemberImagePath } from '@/lib/utils/memberImageUtils';

interface MemberItemProps {
    member: Member;
    onClick?: () => void;
    setIsSidebarOpen: (isOpen: boolean) => void;
    onAddMember: (member: Member) => void;
}

function MemberItem({
    member,
    onClick,
    setIsSidebarOpen,
    onAddMember
}: MemberItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const dragHandleRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Detect screen size
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // 768px is the 'md' breakpoint in Tailwind
        };

        // Check on mount
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        const el = ref.current;

        if (el) {
            return draggable({
                element: el,
                // Only use drag handle on mobile
                dragHandle: isMobile ? (dragHandleRef.current || undefined) : undefined,
                getInitialData: () => ({ member }),
                onDragStart: () => {
                    setDragging(true);
                    setIsSidebarOpen(false)
                },
                onDrop: () => setDragging(false),
            });
        }
    }, [member, setIsSidebarOpen, isMobile]);
    const handleAddClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the card's onClick
        onAddMember(member);
    };

    return (
        <div className='flex flex-col'>
            <ImageCard
                className={dragging ? 'opacity-50' : ''}
                ref={ref}
                imageSrc={getMemberImagePath(member, { withBackground: true })}
                title={member.name}
                subtitle={member.group}
                alt={member.name}
                onClick={onClick}
                startElement={
                    <button
                        onClick={handleAddClick}
                        className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Add to senbatsu"
                    >
                        <BiPlus className="text-xl" />
                    </button>
                }
                endElement={
                    isMobile && (<div ref={dragHandleRef} className="flex items-center justify-center w-10 h-10">
                        <BiMenu />
                    </div>)}
            />
        </div>
    )
}

export default MemberItem