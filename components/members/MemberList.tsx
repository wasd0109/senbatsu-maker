import MemberItem from './MemberItem'
import MemberSublist from './MemberSublist'

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

    const sortMembersByHiragana = (a: Member, b: Member) => {
        const aSort = a.hiragana;
        const bSort = b.hiragana;
        return aSort.localeCompare(bSort, 'ja');
    }

    const onItemDrag = () => {
        setIsSidebarOpen(false)
    }

    if (!groupByGeneration) {
        return (
            <div className="my-1">
                <MemberSublist sortedMembers={[...filteredMembers].sort(sortMembersByHiragana)} onItemDrag={onItemDrag} onAddMember={onAddMember} />
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
        try {
            const aNum = parseInt(a.charAt(0));
            const bNum = parseInt(b.charAt(0));
            return aNum - bNum;
        } catch (err) {
            console.log("cannot parse generation number")
            return -1
        }
    });



    return (
        <>
            {sortedGenerations.map((generation) => {
                return (
                    <div key={generation} className="mb-3">
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-2 px-2">
                            {generation}
                        </h3>
                        <div className="space-y-1">
                            <MemberSublist sortedMembers={[...membersByGeneration[generation]].sort(sortMembersByHiragana)} onItemDrag={onItemDrag} onAddMember={onAddMember} />
                        </div>
                    </div>
                );
            })}
        </>
    )
}

export default MemberList