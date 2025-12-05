import React from 'react'
import MemberItem from './MemberItem';

type MemberSublistProps = {
    sortedMembers: Member[];
    onItemDrag: () => void;
    onAddMember: (member: Member) => void;
}

function MemberSublist({ sortedMembers, onItemDrag, onAddMember }: MemberSublistProps) {
    return <div className='space-y-1'>
        {
            sortedMembers.map((member) => (
                <MemberItem key={member.name} member={member} onDrag={onItemDrag} onAddMember={onAddMember} />
            ))
        }
    </div>


}

export default MemberSublist