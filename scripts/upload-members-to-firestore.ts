import { getFirestore, initializeFirebaseAdmin } from '../lib/firebase-admin';

// Type definition
type Member = {
    name: string;
    hiragana?: string;
    group: string;
    generation?: string;
    graduated?: boolean;
    imageSrc?: string
}

// Member data from page.tsx
const memberData: { [key: string]: Member[] } = {
  "櫻坂46": [
    { name: "上村莉菜", hiragana: "うえむら りな", group: "櫻坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "尾関梨香", hiragana: "おぜき りか", group: "櫻坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "小池美波", hiragana: "こいけ みなみ", group: "櫻坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "小林由依", hiragana: "こばやし ゆい", group: "櫻坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "齋藤冬優花", hiragana: "さいとう ふゆか", group: "櫻坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "関有美子", hiragana: "せき ゆみこ", group: "櫻坂46", generation: "2期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "武元唯衣", hiragana: "たけもと ゆい", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/武元唯衣.jpg" },
    { name: "田村保乃", hiragana: "たむら ほの", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/田村保乃.jpg" },
    { name: "藤吉夏鈴", hiragana: "ふじよし かりん", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/藤吉夏鈴.jpg" },
    { name: "松田里奈", hiragana: "まつだ りな", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/松田里奈.jpg" },
    { name: "森田ひかる", hiragana: "もりた ひかる", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/森田ひかる.jpg" },
    { name: "山﨑天", hiragana: "やまさき てん", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/山﨑天.jpg" },
    { name: "井上梨名", hiragana: "いのうえ りな", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/井上梨名.jpg" },
    { name: "遠藤光莉", hiragana: "えんどう ひかり", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/遠藤光莉.jpg" },
    { name: "大園玲", hiragana: "おおぞの れい", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/大園玲.jpg" },
    { name: "大沼晶保", hiragana: "おおぬま あきほ", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/大沼晶保.jpg" },
    { name: "幸阪茉里乃", hiragana: "こうさか まりの", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/幸阪茉里乃.jpg" },
    { name: "中嶋優月", hiragana: "なかしま ゆづき", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/中嶋優月.jpg" },
    { name: "増本綺良", hiragana: "ますもと きら", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/増本綺良.jpg" },
    { name: "松平璃子", hiragana: "まつだいら りこ", group: "櫻坂46", generation: "2期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "守屋麗奈", hiragana: "もりや れな", group: "櫻坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/櫻坂46/守屋麗奈.jpg" },
    { name: "山下瞳月", hiragana: "やました しづき", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/山下瞳月.jpg" },
    { name: "石森璃花", hiragana: "いしもり りか", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/石森璃花.jpg" },
    { name: "遠藤理子", hiragana: "えんどう りこ", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/遠藤理子.jpg" },
    { name: "小田倉麗奈", hiragana: "おだくら れいな", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/小田倉麗奈.jpg" },
    { name: "小島凪紗", hiragana: "こじま なぎさ", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/小島凪紗.jpg" },
    { name: "谷口愛季", hiragana: "たにぐち あいり", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/谷口愛季.jpg" },
    { name: "的野美青", hiragana: "まとの みお", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/的野美青.jpg" },
    { name: "村井優", hiragana: "むらい ゆう", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/村井優.jpg" },
    { name: "村山美羽", hiragana: "むらやま みう", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/村山美羽.jpg" },
    { name: "向井純葉", hiragana: "むかい いとは", group: "櫻坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/櫻坂46/向井純葉.jpg" },
    { name: "浅井恋乃未", hiragana: "あさい このみ", group: "櫻坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/櫻坂46/浅井恋乃未.jpg" },
    { name: "稲熊ひな", hiragana: "いなぐま ひな", group: "櫻坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/櫻坂46/稲熊ひな.jpg" },
    { name: "勝又春", hiragana: "かつまた はる", group: "櫻坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/櫻坂46/勝又春.jpg" },
    { name: "佐藤愛桜", hiragana: "さとう ねお", group: "櫻坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/櫻坂46/佐藤愛桜.jpg" },
    { name: "中川智尋", hiragana: "なかがわ ちひろ", group: "櫻坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/櫻坂46/中川智尋.jpg" },
    { name: "松本和子", hiragana: "まつもと わこ", group: "櫻坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/櫻坂46/松本和子.jpg" },
    { name: "目黒陽色", hiragana: "めぐろ ひいろ", group: "櫻坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/櫻坂46/目黒陽色.jpg" },
    { name: "山川宇衣", hiragana: "やまかわ うい", group: "櫻坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/櫻坂46/山川宇衣.jpg" },
    { name: "山田桃実", hiragana: "やまだ ももみ", group: "櫻坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/櫻坂46/山田桃実.jpg" }
  ],
  "乃木坂46": [
    { name: "秋元真夏", hiragana: "あきもと まなつ", group: "乃木坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "岩本蓮加", hiragana: "いわもと れんか", group: "乃木坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/乃木坂46/岩本蓮加.jpg" },
    { name: "梅澤美波", hiragana: "うめざわ みなみ", group: "乃木坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/乃木坂46/梅澤美波.jpg" },
    { name: "久保史緒里", hiragana: "くぼ しおり", group: "乃木坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/乃木坂46/久保史緒里.jpg" },
    { name: "柴田柚菜", hiragana: "しばた ゆな", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/柴田柚菜.jpg" },
    { name: "高山一実", hiragana: "たかやま かずみ", group: "乃木坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "中西アルノ", hiragana: "なかにし アルノ", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/中西アルノ.jpg" },
    { name: "林瑠奈", hiragana: "はやし るな", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/林瑠奈.jpg" },
    { name: "松村沙友理", hiragana: "まつむら さゆり", group: "乃木坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "山崎怜奈", hiragana: "やまざき れな", group: "乃木坂46", generation: "2期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "与田祐希", hiragana: "よだ ゆうき", group: "乃木坂46", generation: "3期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "和田まあや", hiragana: "わだ まあや", group: "乃木坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "一ノ瀬美空", hiragana: "いちのせ みく", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/一ノ瀬美空.jpg" },
    { name: "井上和", hiragana: "いのうえ なぎ", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/井上和.jpg" },
    { name: "岡本姫奈", hiragana: "おかもと ひな", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/岡本姫奈.jpg" },
    { name: "小川彩", hiragana: "おがわ あや", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/小川彩.jpg" },
    { name: "奥田いろは", hiragana: "おくだ いろは", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/奥田いろは.jpg" },
    { name: "川﨑桜", hiragana: "かわさき さくら", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/川﨑桜.jpg" },
    { name: "菅原咲月", hiragana: "すがわら さつき", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/菅原咲月.jpg" },
    { name: "筒井あやめ", hiragana: "つつい あやめ", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/筒井あやめ.jpg" },
    { name: "中村麗乃", hiragana: "なかむら れの", group: "乃木坂46", generation: "3期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "弓木奈於", hiragana: "ゆみき なお", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/弓木奈於.jpg" },
    { name: "五百城茉央", hiragana: "いおき まお", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/五百城茉央.jpg" },
    { name: "池田瑛紗", hiragana: "いけだ てれさ", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/池田瑛紗.jpg" },
    { name: "伊藤理々杏", hiragana: "いとう りりあ", group: "乃木坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/乃木坂46/伊藤理々杏.jpg" },
    { name: "遠藤さくら", hiragana: "えんどう さくら", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/遠藤さくら.jpg" },
    { name: "賀喜遥香", hiragana: "かき はるか", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/賀喜遥香.jpg" },
    { name: "掛橋沙耶香", hiragana: "かけはし さやか", group: "乃木坂46", generation: "4期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "金川紗耶", hiragana: "かながわ さや", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/金川紗耶.jpg" },
    { name: "北川悠理", hiragana: "きたがわ ゆり", group: "乃木坂46", generation: "4期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "清宮レイ", hiragana: "せいみや レイ", group: "乃木坂46", generation: "4期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "田村真佑", hiragana: "たむら まゆ", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/田村真佑.jpg" },
    { name: "早川聖来", hiragana: "はやかわ せいら", group: "乃木坂46", generation: "4期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "矢久保美緒", hiragana: "やくぼ みお", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/矢久保美緒.jpg" },
    { name: "黒見明香", hiragana: "くろみ はるか", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/黒見明香.jpg" },
    { name: "佐藤璃果", hiragana: "さとう りか", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/佐藤璃果.jpg" },
    { name: "冨里奈央", hiragana: "とみさと なお", group: "乃木坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/乃木坂46/冨里奈央.jpg" },
    { name: "松尾美佑", hiragana: "まつお みゆ", group: "乃木坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/乃木坂46/松尾美佑.jpg" },
    { name: "吉田綾乃クリスティー", hiragana: "よしだ あやのクリスティー", group: "乃木坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/乃木坂46/吉田綾乃クリスティー.jpg" },
    { name: "愛宕心響", hiragana: "あたご ここね", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/愛宕心響.jpg" },
    { name: "大越ひなの", hiragana: "おおこし ひなの", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/大越ひなの.jpg" },
    { name: "小津玲奈", hiragana: "おづ れいな", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/小津玲奈.jpg" },
    { name: "海邉朱莉", hiragana: "かいべ あかり", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/海邉朱莉.jpg" },
    { name: "川端晃菜", hiragana: "かわばた ひな", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/川端晃菜.jpg" },
    { name: "鈴木佑捺", hiragana: "すずき ゆうな", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/鈴木佑捺.jpg" },
    { name: "瀬戸口心月", hiragana: "せとぐち みつき", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/瀬戸口心月.jpg" },
    { name: "長嶋凛桜", hiragana: "ながしま りお", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/長嶋凛桜.jpg" },
    { name: "増田三莉音", hiragana: "ますだ みりね", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/増田三莉音.jpg" },
    { name: "森平麗心", hiragana: "もりひら うるみ", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/森平麗心.jpg" },
    { name: "矢田萌華", hiragana: "やだ もえか", group: "乃木坂46", generation: "6期生", graduated: false, imageSrc: "/images/members/乃木坂46/矢田萌華.jpg" }
  ],
  "日向坂46": [
    { name: "潮紗理菜", hiragana: "うしお さりな", group: "日向坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "影山優佳", hiragana: "かげやま ゆうか", group: "日向坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "加藤史帆", hiragana: "かとう しほ", group: "日向坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "齊藤京子", hiragana: "さいとう きょうこ", group: "日向坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "佐々木久美", hiragana: "ささき くみ", group: "日向坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "佐々木美玲", hiragana: "ささき みれい", group: "日向坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "高瀬愛奈", hiragana: "たかせ まな", group: "日向坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "高本彩花", hiragana: "たかもと あやか", group: "日向坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "東村芽依", hiragana: "ひがしむら めい", group: "日向坂46", generation: "1期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "金村美玖", hiragana: "かねむら みく", group: "日向坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/日向坂46/金村美玖.jpg" },
    { name: "河田陽菜", hiragana: "かわた ひな", group: "日向坂46", generation: "2期生", graduated: true, imageSrc: "/images/members/日向坂46/河田陽菜.jpg" },
    { name: "小坂菜緒", hiragana: "こさか なお", group: "日向坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/日向坂46/小坂菜緒.jpg" },
    { name: "富田鈴花", hiragana: "とみた すずか", group: "日向坂46", generation: "2期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "丹生明里", hiragana: "にぶ あかり", group: "日向坂46", generation: "2期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "濱岸ひより", hiragana: "はまぎし ひより", group: "日向坂46", generation: "2期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "松田好花", hiragana: "まつだ このか", group: "日向坂46", generation: "2期生", graduated: false, imageSrc: "/images/members/日向坂46/松田好花.jpg" },
    { name: "宮田愛萌", hiragana: "みやた まなも", group: "日向坂46", generation: "2期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "渡邉美穂", hiragana: "わたなべ みほ", group: "日向坂46", generation: "2期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "上村ひなの", hiragana: "かみむら ひなの", group: "日向坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/日向坂46/上村ひなの.jpg" },
    { name: "髙橋未来虹", hiragana: "たかはし みくに", group: "日向坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/日向坂46/髙橋未来虹.jpg" },
    { name: "森本茉莉", hiragana: "もりもと まりぃ", group: "日向坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/日向坂46/森本茉莉.jpg" },
    { name: "山口陽世", hiragana: "やまぐち はるよ", group: "日向坂46", generation: "3期生", graduated: false, imageSrc: "/images/members/日向坂46/山口陽世.jpg" },
    { name: "石塚瑶季", hiragana: "いしづか たまき", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/石塚瑶季.jpg" },
    { name: "岸帆夏", hiragana: "きし ほのか", group: "日向坂46", generation: "4期生", graduated: true, imageSrc: "/images/placeholder.webp" },
    { name: "小西夏菜実", hiragana: "こにし ななみ", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/小西夏菜実.jpg" },
    { name: "清水理央", hiragana: "しみず りお", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/清水理央.jpg" },
    { name: "正源司陽子", hiragana: "しょうげんじ ようこ", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/正源司陽子.jpg" },
    { name: "竹内希来里", hiragana: "たけうち きらり", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/竹内希来里.jpg" },
    { name: "平尾帆夏", hiragana: "ひらお ほのか", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/平尾帆夏.jpg" },
    { name: "平岡海月", hiragana: "ひらおか みつき", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/平岡海月.jpg" },
    { name: "藤嶌果歩", hiragana: "ふじしま かほ", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/藤嶌果歩.jpg" },
    { name: "宮地すみれ", hiragana: "みやち すみれ", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/宮地すみれ.jpg" },
    { name: "山下葉留花", hiragana: "やました はるか", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/山下葉留花.jpg" },
    { name: "渡辺莉奈", hiragana: "わたなべ りな", group: "日向坂46", generation: "4期生", graduated: false, imageSrc: "/images/members/日向坂46/渡辺莉奈.jpg" },
    { name: "大田美月", hiragana: "おおた みづき", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/大田美月.jpg" },
    { name: "大野愛実", hiragana: "おおの まなみ", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/大野愛実.jpg" },
    { name: "片山紗希", hiragana: "かたやま さき", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/片山紗希.jpg" },
    { name: "蔵盛妃那乃", hiragana: "くらもり ひなの", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/蔵盛妃那乃.jpg" },
    { name: "坂井新奈", hiragana: "さかい にいな", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/坂井新奈.jpg" },
    { name: "佐藤優羽", hiragana: "さとう ゆう", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/佐藤優羽.jpg" },
    { name: "下田衣珠季", hiragana: "しもだ いずき", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/下田衣珠季.jpg" },
    { name: "高井俐香", hiragana: "たかい りか", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/高井俐香.jpg" },
    { name: "鶴崎仁香", hiragana: "つるさき にこ", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/鶴崎仁香.jpg" },
    { name: "松尾桜", hiragana: "まつお さくら", group: "日向坂46", generation: "5期生", graduated: false, imageSrc: "/images/members/日向坂46/松尾桜.jpg" }
  ],
}

const groupMetadata = {
  "櫻坂46": { color: "#f19db5" },
  "乃木坂46": { color: "#812990" },
  "日向坂46": { color: "#7cc7e8" },
};

async function uploadMembers() {
  try {
    console.log('Initializing Firebase Admin...');
    initializeFirebaseAdmin();

    const db = getFirestore();
    const membersCollection = process.env.FIRESTORE_MEMBERS_COLLECTION || 'members';
    const groupsCollection = process.env.FIRESTORE_GROUPS_COLLECTION || 'groups';

    console.log('\n📦 Starting member data upload to Firestore...\n');
    console.log(`Using collections:`);
    console.log(`  - Groups: ${groupsCollection}`);
    console.log(`  - Members: ${membersCollection}\n`);

    // Test connection by trying to read from a collection
    try {
      console.log('Testing Firestore connection...');
      // This will create the collection if it doesn't exist when we write to it
      await db.collection('_test').doc('_init').set({ timestamp: new Date().toISOString() });
      await db.collection('_test').doc('_init').delete();
      console.log('✓ Firestore connection successful\n');
    } catch (testError) {
      console.error('❌ Firestore connection failed. Please ensure:');
      console.error('   1. Firestore is enabled in Firebase Console');
      console.error('   2. Go to: https://console.firebase.google.com/project/senbatsu-maker/firestore');
      console.error('   3. Click "Create database" if you haven\'t already\n');
      throw testError;
    }

    // Upload group metadata
    console.log('Uploading group metadata...');
    for (const [groupName, metadata] of Object.entries(groupMetadata)) {
      await db.collection(groupsCollection).doc(groupName).set({
        name: groupName,
        color: metadata.color,
        updatedAt: new Date().toISOString(),
      });
      console.log(`✓ Group: ${groupName}`);
    }

    // Upload members
    console.log('\nUploading members...');
    let totalMembers = 0;

    for (const [groupName, members] of Object.entries(memberData)) {
      console.log(`\n📁 Group: ${groupName}`);

      for (const member of members) {
        const memberDoc = {
          name: member.name,
          hiragana: member.hiragana || '',
          group: groupName,
          generation: member.generation || '',
          graduated: member.graduated || false,
          // Store the same placeholder image path as in page.tsx
          imageSrc: member.imageSrc,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Use member name as document ID for easy querying
        const docId = `${groupName}_${member.name}`.replace(/\s+/g, '_');
        await db.collection(membersCollection).doc(docId).set(memberDoc);

        totalMembers++;
        console.log(`  ✓ ${member.name} (${member.generation || 'N/A'})`);
      }
    }

    console.log(`\n✅ Successfully uploaded ${totalMembers} members to Firestore!`);
    console.log(`\nCollections created:`);
    console.log(`  - ${membersCollection}: ${totalMembers} documents`);
    console.log(`  - ${groupsCollection}: ${Object.keys(groupMetadata).length} documents`);

  } catch (error) {
    console.error('\n❌ Error uploading members:', error);
    process.exit(1);
  }
}

// Run the upload
uploadMembers()
  .then(() => {
    console.log('\n🎉 Upload complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Upload failed:', error);
    process.exit(1);
  });
