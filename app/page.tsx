'use client';

import ImageCard from '@/components/ImageCard';
import MemberList from '@/components/members/MemberList';
import sakuraLogo from "@/assets/groups/sakurazaka.png"
import nogiLogo from "@/assets/groups/nogizaka.png"
import hinataLogo from "@/assets/groups/hinatazaka.svg"
import defaultMemberImage from "@/assets/members/1000_1000_102400.jpg"
import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import { calculateColorWithAlpha } from '@/lib/utils/colorUtils';
import SenbatsuField from '@/components/senbatsu/SenbatsuField';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const memberData: { [key: string]: { name: string; graduated?: boolean; imageSrc: StaticImageData | string }[] } = {
  "櫻坂46": [
    { name: "上村莉菜", graduated: true, imageSrc: defaultMemberImage },
    { name: "尾関梨香", graduated: true, imageSrc: defaultMemberImage },
    { name: "小池美波", graduated: true, imageSrc: defaultMemberImage },
    { name: "小林由依", graduated: true, imageSrc: defaultMemberImage },
    { name: "齋藤冬優花", graduated: true, imageSrc: defaultMemberImage },
    { name: "関有美子", graduated: true, imageSrc: defaultMemberImage },
    { name: "武元唯衣", imageSrc: defaultMemberImage },
    { name: "田村保乃", imageSrc: defaultMemberImage },
    { name: "藤吉夏鈴", imageSrc: defaultMemberImage },
    { name: "松田里奈", imageSrc: defaultMemberImage },
    { name: "森田ひかる", imageSrc: defaultMemberImage },
    { name: "山﨑天", imageSrc: defaultMemberImage },
    { name: "井上梨名", imageSrc: "https://sakurazaka46.com/images/14/b19/4b9bfd6d600102f911b94c1ada103/400_320_102400.jpg" },
    { name: "遠藤光莉", imageSrc: "https://sakurazaka46.com/images/14/dc0/94d7cdae2f72390f4fb06d8042d0b/400_320_102400.jpg" },
    { name: "大園玲", imageSrc: defaultMemberImage },
    { name: "大沼晶保", imageSrc: defaultMemberImage },
    { name: "幸阪茉里乃", imageSrc: defaultMemberImage },
    { name: "中嶋優月", imageSrc: defaultMemberImage },
    { name: "増本綺良", imageSrc: defaultMemberImage },
    { name: "松平璃子", imageSrc: defaultMemberImage },
    { name: "守屋麗奈", imageSrc: defaultMemberImage },
    { name: "山下瞳月", imageSrc: defaultMemberImage },
    { name: "石森璃花", imageSrc: "https://sakurazaka46.com/images/14/f84/000e812e34b92a517f88c0e1ab9f8/400_320_102400.jpg" },
    { name: "遠藤理子", imageSrc: defaultMemberImage },
    { name: "小田倉麗奈", imageSrc: defaultMemberImage },
    { name: "小島凪紗", imageSrc: defaultMemberImage },
    { name: "谷口愛季", imageSrc: defaultMemberImage },
    { name: "的野美青", imageSrc: defaultMemberImage },
    { name: "村井優", imageSrc: defaultMemberImage },
    { name: "村山美羽", imageSrc: defaultMemberImage }
  ],
  "乃木坂46": [
    { name: "秋元真夏", graduated: true, imageSrc: defaultMemberImage },
    { name: "岩本蓮加", imageSrc: defaultMemberImage },
    { name: "梅澤美波", imageSrc: defaultMemberImage },
    { name: "久保史緒里", imageSrc: defaultMemberImage },
    { name: "柴田柚菜", imageSrc: defaultMemberImage },
    { name: "高山一実", graduated: true, imageSrc: defaultMemberImage },
    { name: "中西アルノ", imageSrc: defaultMemberImage },
    { name: "林瑠奈", imageSrc: defaultMemberImage },
    { name: "松村沙友理", graduated: true, imageSrc: defaultMemberImage },
    { name: "山崎怜奈", graduated: true, imageSrc: defaultMemberImage },
    { name: "与田祐希", imageSrc: defaultMemberImage },
    { name: "和田まあや", graduated: true, imageSrc: defaultMemberImage },
    { name: "一ノ瀬美空", imageSrc: defaultMemberImage },
    { name: "井上和", imageSrc: defaultMemberImage },
    { name: "岡本姫奈", imageSrc: defaultMemberImage },
    { name: "小川彩", imageSrc: defaultMemberImage },
    { name: "奥田いろは", imageSrc: defaultMemberImage },
    { name: "川﨑桜", imageSrc: defaultMemberImage },
    { name: "菅原咲月", imageSrc: defaultMemberImage },
    { name: "筒井あやめ", imageSrc: defaultMemberImage },
    { name: "中村麗乃", imageSrc: defaultMemberImage },
    { name: "弓木奈於", imageSrc: defaultMemberImage },
    { name: "五百城茉央", imageSrc: defaultMemberImage },
    { name: "池田瑛紗", imageSrc: defaultMemberImage },
    { name: "伊藤理々杏", imageSrc: defaultMemberImage },
    { name: "遠藤さくら", imageSrc: defaultMemberImage },
    { name: "賀喜遥香", imageSrc: defaultMemberImage },
    { name: "掛橋沙耶香", imageSrc: defaultMemberImage },
    { name: "金川紗耶", imageSrc: defaultMemberImage },
    { name: "北川悠理", imageSrc: defaultMemberImage },
    { name: "清宮レイ", imageSrc: defaultMemberImage },
    { name: "田村真佑", imageSrc: defaultMemberImage },
    { name: "早川聖来", imageSrc: defaultMemberImage },
    { name: "矢久保美緒", imageSrc: defaultMemberImage },
    { name: "黒見明香", imageSrc: defaultMemberImage },
    { name: "佐藤璃果", imageSrc: defaultMemberImage },
    { name: "冨里奈央", imageSrc: defaultMemberImage }
  ],
  "日向坂46": [
    { name: "潮紗理菜", graduated: true, imageSrc: defaultMemberImage },
    { name: "影山優佳", graduated: true, imageSrc: defaultMemberImage },
    { name: "加藤史帆", imageSrc: defaultMemberImage },
    { name: "齊藤京子", graduated: true, imageSrc: defaultMemberImage },
    { name: "佐々木久美", imageSrc: defaultMemberImage },
    { name: "佐々木美玲", imageSrc: defaultMemberImage },
    { name: "高瀬愛奈", imageSrc: defaultMemberImage },
    { name: "高本彩花", graduated: true, imageSrc: defaultMemberImage },
    { name: "東村芽依", imageSrc: defaultMemberImage },
    { name: "金村美玖", imageSrc: defaultMemberImage },
    { name: "河田陽菜", imageSrc: defaultMemberImage },
    { name: "小坂菜緒", imageSrc: defaultMemberImage },
    { name: "富田鈴花", imageSrc: defaultMemberImage },
    { name: "丹生明里", imageSrc: defaultMemberImage },
    { name: "濱岸ひより", imageSrc: defaultMemberImage },
    { name: "松田好花", imageSrc: defaultMemberImage },
    { name: "宮田愛萌", imageSrc: defaultMemberImage },
    { name: "渡邉美穂", imageSrc: defaultMemberImage },
    { name: "上村ひなの", imageSrc: defaultMemberImage },
    { name: "髙橋未来虹", imageSrc: defaultMemberImage },
    { name: "森本茉莉", imageSrc: defaultMemberImage },
    { name: "山口陽世", imageSrc: defaultMemberImage },
    { name: "石塚瑶季", imageSrc: defaultMemberImage },
    { name: "岸帆夏", imageSrc: defaultMemberImage },
    { name: "小西夏菜実", imageSrc: defaultMemberImage },
    { name: "清水理央", imageSrc: defaultMemberImage },
    { name: "正源司陽子", imageSrc: defaultMemberImage },
    { name: "竹内希来里", imageSrc: defaultMemberImage },
    { name: "平尾帆夏", imageSrc: defaultMemberImage },
    { name: "平岡海月", imageSrc: defaultMemberImage },
    { name: "藤嶌果歩", imageSrc: defaultMemberImage },
    { name: "宮地すみれ", imageSrc: defaultMemberImage },
    { name: "山下葉留花", imageSrc: defaultMemberImage },
    { name: "渡辺莉奈", imageSrc: defaultMemberImage }
  ],
}

const groupMetadata: { [key: string]: { logo: StaticImageData; color: string } } = {
  "櫻坂46": { logo: sakuraLogo, color: "#f19db5" },
  "乃木坂46": { logo: nogiLogo, color: "#812990" },
  "日向坂46": { logo: hinataLogo, color: "#7cc7e8" },
}


type Member = { name: string; graduated?: boolean; groupName?: string };
type SenbatsuGrid = { [rowIndex: number]: { [colIndex: number]: Member } };

const isLocation = (obj: any): obj is { rowIndex: number; colIndex: number } => {
  return obj && typeof obj.rowIndex === 'number' && typeof obj.colIndex === 'number';
}

const isMember = (obj: any): obj is Member => {
  return obj && typeof obj.name === 'string';
}

// Initialize senbatsu grid with empty slots
const initializeSenbatsuGrid = (rows: number, columnsPerRow: { [key: number]: number }): SenbatsuGrid => {
  const grid: SenbatsuGrid = {};
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    grid[rowIndex] = {};
    const numColumns = columnsPerRow[rows - rowIndex] || 0;
    for (let colIndex = 0; colIndex < numColumns; colIndex++) {
      // Initialize with empty object - will be undefined until a member is placed
      // We don't set anything here, just ensure the row exists
    }
  }
  return grid;
}

export default function Home() {
  const [showMemberList, setShowMemberList] = useState(Object.fromEntries(Object.keys(memberData).map(group => [group, false])));
  const [senbatsuMembers, setSenbatsuMembers] = useState<SenbatsuGrid>(() =>
    initializeSenbatsuGrid(3, { 1: 3, 2: 7, 3: 7 })
  );

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          // if dropped outside of any drop targets
          return;
        }
        const destinationLocation = destination.data.location;
        const member = source.data.member;
        console.log(destinationLocation)
        console.log(member)
        if (!isLocation(destinationLocation) || !isMember(member)) {
          return;
        }
        console.log(destinationLocation)
        console.log(senbatsuMembers)

        setSenbatsuMembers(prevState => {
          const newState = { ...prevState };
          if (!newState[destinationLocation.rowIndex]) {
            newState[destinationLocation.rowIndex] = {};
          }
          newState[destinationLocation.rowIndex][destinationLocation.colIndex] = member;
          return newState;
        })
      },
    });

  }, [senbatsuMembers]);
  console.log(senbatsuMembers)
  return (
    <div className="flex h-screen">
      <aside className="w-80 flex-shrink-0 border-r border-gray-200 overflow-y-auto p-6 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Groups</h2>
        {Object.keys(memberData).map((groupName) => {
          return (
            <div key={groupName} className="mb-4">
              <ImageCard selected={showMemberList[groupName]} selectedColor={calculateColorWithAlpha(groupMetadata[groupName].color, 0.3)} fit="contain" imageSrc={groupMetadata[groupName].logo} title={groupName} onClick={() => { setShowMemberList(prevState => ({ ...prevState, [groupName]: !prevState[groupName] })) }} />
              {showMemberList[groupName] && <MemberList members={memberData[groupName]} />}
            </div>
          )
        })}
      </aside>
      <main className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-4xl">
          <SenbatsuField senbatsuMembers={senbatsuMembers} />
        </div>
      </main>
    </div>
  );
}
