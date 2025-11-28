type Member = {
    name: string;
    hiragana?: string;
    group: string;
    generation?: string;
    graduated?: boolean;
    imageSrc: StaticImageData | string
}

type MemberWithGroupName = Member & {
    groupName: string;
}