import React from 'react'
import MemberItem from './MemberItem'

interface MemberListProps {
    members: Member[]
}

function MemberList({ members }: MemberListProps) {
    return (

        members.map((member) => (
            <MemberItem key={member.name} member={member} />
        ))

    )
}

export default MemberList