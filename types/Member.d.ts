type Member = {
    name: string;
    group: string;
    graduated?: boolean;
    imageSrc: StaticImageData | string
}

type MemberWithGroupName = Member & {
    groupName: string;
}