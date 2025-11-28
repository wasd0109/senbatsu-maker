'use client';

import ImageCard from '@/components/ImageCard';
import MemberList from '@/components/members/MemberList';
import sakuraLogo from "@/assets/groups/sakurazaka.png"
import nogiLogo from "@/assets/groups/nogizaka.png"
import hinataLogo from "@/assets/groups/hinatazaka.svg"
import defaultMemberImage from "@/assets/placeholder.webp"
import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import { calculateColorWithAlpha } from '@/lib/utils/colorUtils';
import SenbatsuField from '@/components/senbatsu/SenbatsuField';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const memberData: { [key: string]: Member[] } = {
  "櫻坂46": [
    { name: "上村莉菜", graduated: true, imageSrc: defaultMemberImage },
    { name: "尾関梨香", graduated: true, imageSrc: defaultMemberImage },
    { name: "小池美波", graduated: true, imageSrc: defaultMemberImage },
    { name: "小林由依", graduated: true, imageSrc: defaultMemberImage },
    { name: "齋藤冬優花", graduated: true, imageSrc: defaultMemberImage },
    { name: "関有美子", graduated: true, imageSrc: defaultMemberImage },
    { name: "武元唯衣", imageSrc: "/images/members/櫻坂46/武元唯衣.jpg" },
    { name: "田村保乃", imageSrc: "/images/members/櫻坂46/田村保乃.jpg" },
    { name: "藤吉夏鈴", imageSrc: "/images/members/櫻坂46/藤吉夏鈴.jpg" },
    { name: "松田里奈", imageSrc: "/images/members/櫻坂46/松田里奈.jpg" },
    { name: "森田ひかる", imageSrc: "/images/members/櫻坂46/森田ひかる.jpg" },
    { name: "山﨑天", imageSrc: "/images/members/櫻坂46/山﨑天.jpg" },
    { name: "井上梨名", imageSrc: "/images/members/櫻坂46/井上梨名.jpg" },
    { name: "遠藤光莉", imageSrc: "/images/members/櫻坂46/遠藤光莉.jpg" },
    { name: "大園玲", imageSrc: "/images/members/櫻坂46/大園玲.jpg" },
    { name: "大沼晶保", imageSrc: "/images/members/櫻坂46/大沼晶保.jpg" },
    { name: "幸阪茉里乃", imageSrc: "/images/members/櫻坂46/幸阪茉里乃.jpg" },
    { name: "中嶋優月", imageSrc: "/images/members/櫻坂46/中嶋優月.jpg" },
    { name: "増本綺良", imageSrc: "/images/members/櫻坂46/増本綺良.jpg" },
    { name: "松平璃子", imageSrc: defaultMemberImage },
    { name: "守屋麗奈", imageSrc: "/images/members/櫻坂46/守屋麗奈.jpg" },
    { name: "山下瞳月", imageSrc: "/images/members/櫻坂46/山下瞳月.jpg" },
    { name: "石森璃花", imageSrc: "/images/members/櫻坂46/石森璃花.jpg" },
    { name: "遠藤理子", imageSrc: "/images/members/櫻坂46/遠藤理子.jpg" },
    { name: "小田倉麗奈", imageSrc: "/images/members/櫻坂46/小田倉麗奈.jpg" },
    { name: "小島凪紗", imageSrc: "/images/members/櫻坂46/小島凪紗.jpg" },
    { name: "谷口愛季", imageSrc: "/images/members/櫻坂46/谷口愛季.jpg" },
    { name: "的野美青", imageSrc: "/images/members/櫻坂46/的野美青.jpg" },
    { name: "村井優", imageSrc: "/images/members/櫻坂46/村井優.jpg" },
    { name: "村山美羽", imageSrc: "/images/members/櫻坂46/村山美羽.jpg" },
    { name: "向井純葉", imageSrc: "/images/members/櫻坂46/向井純葉.jpg" },
    { name: "浅井恋乃未", imageSrc: "/images/members/櫻坂46/浅井恋乃未.jpg" },
    { name: "稲熊ひな", imageSrc: "/images/members/櫻坂46/稲熊ひな.jpg" },
    { name: "勝又春", imageSrc: "/images/members/櫻坂46/勝又春.jpg" },
    { name: "佐藤愛桜", imageSrc: "/images/members/櫻坂46/佐藤愛桜.jpg" },
    { name: "中川智尋", imageSrc: "/images/members/櫻坂46/中川智尋.jpg" },
    { name: "松本和子", imageSrc: "/images/members/櫻坂46/松本和子.jpg" },
    { name: "目黒陽色", imageSrc: "/images/members/櫻坂46/目黒陽色.jpg" },
    { name: "山川宇衣", imageSrc: "/images/members/櫻坂46/山川宇衣.jpg" },
    { name: "山田桃実", imageSrc: "/images/members/櫻坂46/山田桃実.jpg" }
  ],
  "乃木坂46": [
    { name: "秋元真夏", graduated: true, imageSrc: defaultMemberImage },
    { name: "岩本蓮加", imageSrc: "/images/members/乃木坂46/岩本蓮加.jpg" },
    { name: "梅澤美波", imageSrc: "/images/members/乃木坂46/梅澤美波.jpg" },
    { name: "久保史緒里", imageSrc: "/images/members/乃木坂46/久保史緒里.jpg" },
    { name: "柴田柚菜", imageSrc: "/images/members/乃木坂46/柴田柚菜.jpg" },
    { name: "高山一実", graduated: true, imageSrc: defaultMemberImage },
    { name: "中西アルノ", imageSrc: "/images/members/乃木坂46/中西アルノ.jpg" },
    { name: "林瑠奈", imageSrc: "/images/members/乃木坂46/林瑠奈.jpg" },
    { name: "松村沙友理", graduated: true, imageSrc: defaultMemberImage },
    { name: "山崎怜奈", graduated: true, imageSrc: defaultMemberImage },
    { name: "与田祐希", imageSrc: defaultMemberImage },
    { name: "和田まあや", graduated: true, imageSrc: defaultMemberImage },
    { name: "一ノ瀬美空", imageSrc: "/images/members/乃木坂46/一ノ瀬美空.jpg" },
    { name: "井上和", imageSrc: "/images/members/乃木坂46/井上和.jpg" },
    { name: "岡本姫奈", imageSrc: "/images/members/乃木坂46/岡本姫奈.jpg" },
    { name: "小川彩", imageSrc: "/images/members/乃木坂46/小川彩.jpg" },
    { name: "奥田いろは", imageSrc: "/images/members/乃木坂46/奥田いろは.jpg" },
    { name: "川﨑桜", imageSrc: "/images/members/乃木坂46/川﨑桜.jpg" },
    { name: "菅原咲月", imageSrc: "/images/members/乃木坂46/菅原咲月.jpg" },
    { name: "筒井あやめ", imageSrc: "/images/members/乃木坂46/筒井あやめ.jpg" },
    { name: "中村麗乃", imageSrc: defaultMemberImage },
    { name: "弓木奈於", imageSrc: "/images/members/乃木坂46/弓木奈於.jpg" },
    { name: "五百城茉央", imageSrc: "/images/members/乃木坂46/五百城茉央.jpg" },
    { name: "池田瑛紗", imageSrc: "/images/members/乃木坂46/池田瑛紗.jpg" },
    { name: "伊藤理々杏", imageSrc: "/images/members/乃木坂46/伊藤理々杏.jpg" },
    { name: "遠藤さくら", imageSrc: "/images/members/乃木坂46/遠藤さくら.jpg" },
    { name: "賀喜遥香", imageSrc: "/images/members/乃木坂46/賀喜遥香.jpg" },
    { name: "掛橋沙耶香", imageSrc: defaultMemberImage },
    { name: "金川紗耶", imageSrc: "/images/members/乃木坂46/金川紗耶.jpg" },
    { name: "北川悠理", imageSrc: defaultMemberImage },
    { name: "清宮レイ", imageSrc: defaultMemberImage },
    { name: "田村真佑", imageSrc: "/images/members/乃木坂46/田村真佑.jpg" },
    { name: "早川聖来", imageSrc: defaultMemberImage },
    { name: "矢久保美緒", imageSrc: "/images/members/乃木坂46/矢久保美緒.jpg" },
    { name: "黒見明香", imageSrc: "/images/members/乃木坂46/黒見明香.jpg" },
    { name: "佐藤璃果", imageSrc: "/images/members/乃木坂46/佐藤璃果.jpg" },
    { name: "冨里奈央", imageSrc: "/images/members/乃木坂46/冨里奈央.jpg" },
    { name: "松尾美佑", imageSrc: "/images/members/乃木坂46/松尾美佑.jpg" },
    { name: "吉田綾乃クリスティー", imageSrc: "/images/members/乃木坂46/吉田綾乃クリスティー.jpg" },
    { name: "愛宕心響", imageSrc: "/images/members/乃木坂46/愛宕心響.jpg" },
    { name: "大越ひなの", imageSrc: "/images/members/乃木坂46/大越ひなの.jpg" },
    { name: "小津玲奈", imageSrc: "/images/members/乃木坂46/小津玲奈.jpg" },
    { name: "海邉朱莉", imageSrc: "/images/members/乃木坂46/海邉朱莉.jpg" },
    { name: "川端晃菜", imageSrc: "/images/members/乃木坂46/川端晃菜.jpg" },
    { name: "鈴木佑捺", imageSrc: "/images/members/乃木坂46/鈴木佑捺.jpg" },
    { name: "瀬戸口心月", imageSrc: "/images/members/乃木坂46/瀬戸口心月.jpg" },
    { name: "長嶋凛桜", imageSrc: "/images/members/乃木坂46/長嶋凛桜.jpg" },
    { name: "増田三莉音", imageSrc: "/images/members/乃木坂46/増田三莉音.jpg" },
    { name: "森平麗心", imageSrc: "/images/members/乃木坂46/森平麗心.jpg" },
    { name: "矢田萌華", imageSrc: "/images/members/乃木坂46/矢田萌華.jpg" }
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
    { name: "金村美玖", imageSrc: "/images/members/日向坂46/金村美玖.jpg" },
    { name: "河田陽菜", imageSrc: "/images/members/日向坂46/河田陽菜.jpg" },
    { name: "小坂菜緒", imageSrc: "/images/members/日向坂46/小坂菜緒.jpg" },
    { name: "富田鈴花", imageSrc: defaultMemberImage },
    { name: "丹生明里", imageSrc: defaultMemberImage },
    { name: "濱岸ひより", imageSrc: defaultMemberImage },
    { name: "松田好花", imageSrc: "/images/members/日向坂46/松田好花.jpg" },
    { name: "宮田愛萌", imageSrc: defaultMemberImage },
    { name: "渡邉美穂", imageSrc: defaultMemberImage },
    { name: "上村ひなの", imageSrc: "/images/members/日向坂46/上村ひなの.jpg" },
    { name: "髙橋未来虹", imageSrc: "/images/members/日向坂46/髙橋未来虹.jpg" },
    { name: "森本茉莉", imageSrc: "/images/members/日向坂46/森本茉莉.jpg" },
    { name: "山口陽世", imageSrc: "/images/members/日向坂46/山口陽世.jpg" },
    { name: "石塚瑶季", imageSrc: "/images/members/日向坂46/石塚瑶季.jpg" },
    { name: "岸帆夏", imageSrc: defaultMemberImage },
    { name: "小西夏菜実", imageSrc: "/images/members/日向坂46/小西夏菜実.jpg" },
    { name: "清水理央", imageSrc: "/images/members/日向坂46/清水理央.jpg" },
    { name: "正源司陽子", imageSrc: "/images/members/日向坂46/正源司陽子.jpg" },
    { name: "竹内希来里", imageSrc: "/images/members/日向坂46/竹内希来里.jpg" },
    { name: "平尾帆夏", imageSrc: "/images/members/日向坂46/平尾帆夏.jpg" },
    { name: "平岡海月", imageSrc: "/images/members/日向坂46/平岡海月.jpg" },
    { name: "藤嶌果歩", imageSrc: "/images/members/日向坂46/藤嶌果歩.jpg" },
    { name: "宮地すみれ", imageSrc: "/images/members/日向坂46/宮地すみれ.jpg" },
    { name: "山下葉留花", imageSrc: "/images/members/日向坂46/山下葉留花.jpg" },
    { name: "渡辺莉奈", imageSrc: "/images/members/日向坂46/渡辺莉奈.jpg" },
    { name: "大田美月", imageSrc: "/images/members/日向坂46/大田美月.jpg" },
    { name: "大野愛実", imageSrc: "/images/members/日向坂46/大野愛実.jpg" },
    { name: "片山紗希", imageSrc: "/images/members/日向坂46/片山紗希.jpg" },
    { name: "蔵盛妃那乃", imageSrc: "/images/members/日向坂46/蔵盛妃那乃.jpg" },
    { name: "坂井新奈", imageSrc: "/images/members/日向坂46/坂井新奈.jpg" },
    { name: "佐藤優羽", imageSrc: "/images/members/日向坂46/佐藤優羽.jpg" },
    { name: "下田衣珠季", imageSrc: "/images/members/日向坂46/下田衣珠季.jpg" },
    { name: "高井俐香", imageSrc: "/images/members/日向坂46/高井俐香.jpg" },
    { name: "鶴崎仁香", imageSrc: "/images/members/日向坂46/鶴崎仁香.jpg" },
    { name: "松尾桜", imageSrc: "/images/members/日向坂46/松尾桜.jpg" }
  ],
}

const groupMetadata: { [key: string]: { logo: StaticImageData; color: string } } = {
  "櫻坂46": { logo: sakuraLogo, color: "#f19db5" },
  "乃木坂46": { logo: nogiLogo, color: "#812990" },
  "日向坂46": { logo: hinataLogo, color: "#7cc7e8" },
}


type SenbatsuGrid = { [rowIndex: number]: { [colIndex: number]: Member } };

const isLocation = (obj: unknown): obj is { rowIndex: number; colIndex: number } => {
  return typeof obj === 'object' && obj !== null && 'rowIndex' in obj && 'colIndex' in obj && typeof obj.rowIndex === 'number' && typeof obj.colIndex === 'number';
}

const isMember = (obj: unknown): obj is Member => {
  return typeof obj === 'object' && obj !== null && 'name' in obj && typeof obj.name === 'string';
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
