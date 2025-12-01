import MemberItem from './MemberItem'

interface MemberListProps {
    members: Member[]
    groupByGeneration: boolean
    showGraduated: boolean
    setIsSidebarOpen: (isOpen: boolean) => void
    onAddMember: (member: Member) => void
}

function MemberList({ members, groupByGeneration, showGraduated, setIsSidebarOpen, onAddMember }: MemberListProps) {

    // Filter members based on graduated status
    const filteredMembers = showGraduated ? members : members.filter(member => !member.graduated);

    // Sort all members by hiragana
    const sortedMembers = [...filteredMembers].sort((a, b) => {
        const aSort = a.hiragana || a.name;
        const bSort = b.hiragana || b.name;
        return aSort.localeCompare(bSort, 'ja');
    });

    if (!groupByGeneration) {
        return (
            <div className="space-y-1">
                {sortedMembers.map((member) => (
                    <MemberItem key={member.name} member={member} setIsSidebarOpen={setIsSidebarOpen} onAddMember={onAddMember} />
                ))}
            </div>
        );
    }

    // Group members by generation
    const membersByGeneration = filteredMembers.reduce((acc, member) => {
        const generation = member.generation || '不明';
        if (!acc[generation]) {
            acc[generation] = [];
        }
        acc[generation].push(member);
        return acc;
    }, {} as Record<string, Member[]>);

    // Sort generations by first character (number) in ascending order
    const sortedGenerations = Object.keys(membersByGeneration).sort((a, b) => {
        const aNum = parseInt(a.charAt(0)) || 999;
        const bNum = parseInt(b.charAt(0)) || 999;
        return aNum - bNum;
    });

    return (
        <>
            {sortedGenerations.map((generation) => {
                // Sort members within each generation by hiragana
                const sortedMembersInGen = [...membersByGeneration[generation]].sort((a, b) => {
                    const aSort = a.hiragana || a.name;
                    const bSort = b.hiragana || b.name;
                    return aSort.localeCompare(bSort, 'ja');
                });

                return (
                    <div key={generation} className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-2 px-2">
                            {generation}
                        </h3>
                        <div className="space-y-1">
                            {sortedMembersInGen.map((member) => (
                                <MemberItem key={member.name} member={member} setIsSidebarOpen={setIsSidebarOpen} onAddMember={onAddMember} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default MemberList