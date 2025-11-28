const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const memberData = {
  "櫻坂46": [
    { name: "武元唯衣", url: "https://sakurazaka46.com/images/14/188/20e0a8033e39df007cf34f3d8efa3/400_320_102400.jpg" },
    { name: "田村保乃", url: "https://sakurazaka46.com/images/14/d64/f3aad591987805162227830f33734/400_320_102400.jpg" },
    { name: "藤吉夏鈴", url: "https://sakurazaka46.com/images/14/afd/51823010f3577f32bf7a8146b5d99/400_320_102400.jpg" },
    { name: "松田里奈", url: "https://sakurazaka46.com/images/14/99a/30cd86661500ac50a02670516252f/400_320_102400.jpg" },
    { name: "森田ひかる", url: "https://sakurazaka46.com/images/14/f6a/385e70c721f6d30065ef377c34654/400_320_102400.jpg" },
    { name: "山﨑天", url: "https://sakurazaka46.com/images/14/7d3/e33b1d6ac91cf58a836e55a6c25ad/400_320_102400.jpg" },
    { name: "井上梨名", url: "https://sakurazaka46.com/images/14/b19/4b9bfd6d600102f911b94c1ada103/400_320_102400.jpg" },
    { name: "遠藤光莉", url: "https://sakurazaka46.com/images/14/dc0/94d7cdae2f72390f4fb06d8042d0b/400_320_102400.jpg" },
    { name: "大園玲", url: "https://sakurazaka46.com/images/14/264/4723da4508f477fe5f2da70bba4b3/400_320_102400.jpg" },
    { name: "大沼晶保", url: "https://sakurazaka46.com/images/14/c8e/27b5891f5cbd50fd4de6000ed37c3/400_320_102400.jpg" },
    { name: "幸阪茉里乃", url: "https://sakurazaka46.com/images/14/afe/7dd7bb436a5de47ade0575bda744f/400_320_102400.jpg" },
    { name: "中嶋優月", url: "https://sakurazaka46.com/images/14/c4f/333b700dfdb745af4b0f375a3dd3f/400_320_102400.jpg" },
    { name: "増本綺良", url: "https://sakurazaka46.com/images/14/4eb/62d5a821fca366662513f9e12cea7/400_320_102400.jpg" },
    { name: "守屋麗奈", url: "https://sakurazaka46.com/images/14/2e4/7662aae2c7059221311d34aa4c6a3/400_320_102400.jpg" },
    { name: "山下瞳月", url: "https://sakurazaka46.com/images/14/45d/5ddc2679f0e7a2dcca1905b1e6012/400_320_102400.jpg" },
    { name: "石森璃花", url: "https://sakurazaka46.com/images/14/f84/000e812e34b92a517f88c0e1ab9f8/400_320_102400.jpg" },
    { name: "遠藤理子", url: "https://sakurazaka46.com/images/14/fb8/33b79df1a181d3a21e23d21422cb1/400_320_102400.jpg" },
    { name: "小田倉麗奈", url: "https://sakurazaka46.com/images/14/ac6/72c53251c1034657acd9be0c09ba9/400_320_102400.jpg" },
    { name: "小島凪紗", url: "https://sakurazaka46.com/images/14/833/2715333dadd74a1157f37fdbf0108/400_320_102400.jpg" },
    { name: "谷口愛季", url: "https://sakurazaka46.com/images/14/dd9/ef473ddc2db5bcb9f292df216aff3/400_320_102400.jpg" },
    { name: "的野美青", url: "https://sakurazaka46.com/images/14/74a/4fbc9c0ee8ef016d81c1d52aee23d/400_320_102400.jpg" },
    { name: "村井優", url: "https://sakurazaka46.com/images/14/3fb/82d100ecdf6f7eb667b7b0782edfe/400_320_102400.jpg" },
    { name: "村山美羽", url: "https://sakurazaka46.com/images/14/578/f65d04c371834316d4addf71c7b9a/400_320_102400.jpg" },
    { name: "向井純葉", url: "https://sakurazaka46.com/images/14/754/bc6ea8285e20e5f167ee7eacc31e1/400_320_102400.jpg" },
    { name: "浅井恋乃未", url: "https://sakurazaka46.com/images/14/4c3/1ddbf780024df3164450dc65fff12/400_320_102400.jpg" },
    { name: "稲熊ひな", url: "https://sakurazaka46.com/images/14/5df/743ca24e09d69be785c6339ed318f/400_320_102400.jpg" },
    { name: "勝又春", url: "https://sakurazaka46.com/images/14/abc/68d30887b7eab270febd23cb2607d/400_320_102400.jpg" },
    { name: "佐藤愛桜", url: "https://sakurazaka46.com/images/14/c3f/d7f2f1a47d14132dddb3ea29c8f09/400_320_102400.jpg" },
    { name: "中川智尋", url: "https://sakurazaka46.com/images/14/22b/b397bfde982a1ff3c2a3aa8ab1353/400_320_102400.jpg" },
    { name: "松本和子", url: "https://sakurazaka46.com/images/14/18c/ff0622d4ad4a12ba1ce3a141a00ec/400_320_102400.jpg" },
    { name: "目黒陽色", url: "https://sakurazaka46.com/images/14/c1e/ba544bf5472491923f3c2c0a2ea8c/400_320_102400.jpg" },
    { name: "山川宇衣", url: "https://sakurazaka46.com/images/14/d37/36727e01aae8a390c3ff6dc4615c2/400_320_102400.jpg" },
    { name: "山田桃実", url: "https://sakurazaka46.com/images/14/16b/03d38a618a7ec9962d3a2c134d63f/400_320_102400.jpg" }
  ],
  "乃木坂46": [
    { name: "岩本蓮加", url: "https://www.nogizaka46.com/images/46/4a8/fa2fc4b3c75b9568ce9adbc16d4bd.jpg" },
    { name: "梅澤美波", url: "https://www.nogizaka46.com/images/46/8c7/646b36a936a7b4502c3020bbc090a.jpg" },
    { name: "久保史緒里", url: "https://www.nogizaka46.com/images/46/445/60cae08cc551e45e9d8aa008f871c.jpg" },
    { name: "柴田柚菜", url: "https://www.nogizaka46.com/images/46/6d8/4643f09fc585a92576513888606c2.jpg" },
    { name: "中西アルノ", url: "https://www.nogizaka46.com/images/46/605/fde6153cac131c43a2e8e0ac0bfcb.jpg" },
    { name: "林瑠奈", url: "https://www.nogizaka46.com/images/46/cb1/f34ad14ecbf7be125b2f2f243f841.jpg" },
    { name: "一ノ瀬美空", url: "https://www.nogizaka46.com/images/46/d21/1d87f2203680137df7346b7551ed0.jpg" },
    { name: "井上和", url: "https://www.nogizaka46.com/images/46/540/61c907a38e56dced12a57ab544fd3.jpg" },
    { name: "岡本姫奈", url: "https://www.nogizaka46.com/images/46/0b4/6e7b29737ae59929b3b5d54901df9.jpg" },
    { name: "小川彩", url: "https://www.nogizaka46.com/images/46/e8f/d4b6b2c5802a42f04de0b62f4ab7f.jpg" },
    { name: "奥田いろは", url: "https://www.nogizaka46.com/images/46/c2f/3eeaa463de1b7c93ce62b62270ec8.jpg" },
    { name: "川﨑桜", url: "https://www.nogizaka46.com/images/46/b4e/2a4faecdf5e257fa5e8aae4672f82.jpg" },
    { name: "菅原咲月", url: "https://www.nogizaka46.com/images/46/c09/dfacda505809637c8214da8a8432f.jpg" },
    { name: "筒井あやめ", url: "https://www.nogizaka46.com/images/46/9db/414579921f85d8dd289e573c96dc3.jpg" },
    { name: "弓木奈於", url: "https://www.nogizaka46.com/images/46/f75/2ec1740de010cde723653a4794af2.jpg" },
    { name: "五百城茉央", url: "https://www.nogizaka46.com/images/46/ec1/9c670b4ade367a2f551f26eef4450.jpg" },
    { name: "池田瑛紗", url: "https://www.nogizaka46.com/images/46/3cd/248094368f7aab375f1900195098a.jpg" },
    { name: "伊藤理々杏", url: "https://www.nogizaka46.com/images/46/1d1/b0f71982a410acda6e979d41cfb51.jpg" },
    { name: "遠藤さくら", url: "https://www.nogizaka46.com/images/46/d90/5ca63b14dde51e680517af2216408.jpg" },
    { name: "賀喜遥香", url: "https://www.nogizaka46.com/images/46/9e1/b4f576fdc288cc8cc68320f657a5d.jpg" },
    { name: "金川紗耶", url: "https://www.nogizaka46.com/images/46/880/87280a20095abdde1ffcd122d8d42.jpg" },
    { name: "田村真佑", url: "https://www.nogizaka46.com/images/46/de5/915861e02d78a55180a5d58ea5c80.jpg" },
    { name: "矢久保美緒", url: "https://www.nogizaka46.com/images/46/c7c/c19487b659717498f8ed992b08fce.jpg" },
    { name: "黒見明香", url: "https://www.nogizaka46.com/images/46/143/57bc0bef04a325148a8a7c62541e1.jpg" },
    { name: "佐藤璃果", url: "https://www.nogizaka46.com/images/46/d5c/22cbd1c9536b89d66fb470e34f51e.jpg" },
    { name: "冨里奈央", url: "https://www.nogizaka46.com/images/46/e27/66bd6c894d1a96288bb9dfaf8809f.jpg" },
    { name: "松尾美佑", url: "https://www.nogizaka46.com/images/46/3bd/51a432d9b74ca8b45bbc0e07d34df.jpg" },
    { name: "吉田綾乃クリスティー", url: "https://www.nogizaka46.com/images/46/7ae/b1038e6c3ecb60b9941b6aed7c276.jpg" },
    { name: "愛宕心響", url: "https://www.nogizaka46.com/images/46/abd/4779c6d304e1c50c16d3f08e6e818.jpg" },
    { name: "大越ひなの", url: "https://www.nogizaka46.com/images/46/e94/f1e863935213cd18a7c25e87795f6.jpg" },
    { name: "小津玲奈", url: "https://www.nogizaka46.com/images/46/59c/974b3199023a021b45c9d1b5a7635.jpg" },
    { name: "海邉朱莉", url: "https://www.nogizaka46.com/images/46/9f0/a5e7a663deb87b228ebded01540be.jpg" },
    { name: "川端晃菜", url: "https://www.nogizaka46.com/images/46/c95/5958d930809c5a57bf2e1b29a8354.jpg" },
    { name: "鈴木佑捺", url: "https://www.nogizaka46.com/images/46/4f9/78599b601e4a5abe702f5c84241ae.jpg" },
    { name: "瀬戸口心月", url: "https://www.nogizaka46.com/images/46/4b1/dbd952eb8141c36fae23b5b3b6098.jpg" },
    { name: "長嶋凛桜", url: "https://www.nogizaka46.com/images/46/c1d/2368d8afc850d797155f7d93d0569.jpg" },
    { name: "増田三莉音", url: "https://www.nogizaka46.com/images/46/86b/0333e9148ad78d217822ccde31db8.jpg" },
    { name: "森平麗心", url: "https://www.nogizaka46.com/images/46/035/aca8b6dccc829b810d24d6fbfc7c3.jpg" },
    { name: "矢田萌華", url: "https://www.nogizaka46.com/images/46/1b6/eb145a98c28698e68696ed7deeab0.jpg" }
  ],
  "日向坂46": [
    { name: "金村美玖", url: "https://cdn.hinatazaka46.com/images/14/cbc/d1cb5ac751a0038704dcb1f03462f/800_800_102400.jpg" },
    { name: "河田陽菜", url: "https://cdn.hinatazaka46.com/images/14/b91/c85a566828c5b52b392ead7cb9d35/800_800_102400.jpg" },
    { name: "小坂菜緒", url: "https://cdn.hinatazaka46.com/images/14/a5b/07f4597c589bc06d3a9daf61c355a/800_800_102400.jpg" },
    { name: "松田好花", url: "https://cdn.hinatazaka46.com/images/14/5f6/8fff4d82a94f458f8e93ab2cd8bdc/800_800_102400.jpg" },
    { name: "上村ひなの", url: "https://cdn.hinatazaka46.com/images/14/f5a/11215aab89ddb4f3229fc10abbb3d/800_800_102400.jpg" },
    { name: "髙橋未来虹", url: "https://cdn.hinatazaka46.com/images/14/7d0/0e90ce02923eb0cd872e2fa8d3f00/800_800_102400.jpg" },
    { name: "森本茉莉", url: "https://cdn.hinatazaka46.com/images/14/abc/8bab66b616bdc2da0d70ac7e9793f/800_800_102400.jpg" },
    { name: "山口陽世", url: "https://cdn.hinatazaka46.com/images/14/f08/9749323f550c0a3576e6b0cb2fe8b/800_800_102400.jpg" },
    { name: "石塚瑶季", url: "https://cdn.hinatazaka46.com/images/14/1ad/5ac47cabb38c185c0048973531d26/800_800_102400.jpg" },
    { name: "小西夏菜実", url: "https://cdn.hinatazaka46.com/images/14/02d/7472616773e47e0b00af1d73fe0a0/800_800_102400.jpg" },
    { name: "清水理央", url: "https://cdn.hinatazaka46.com/images/14/b0a/2ac28754d5f9965bc864182b8d35d/800_800_102400.jpg" },
    { name: "正源司陽子", url: "https://cdn.hinatazaka46.com/images/14/58b/b8c0350612a2ab0d73290b58df49c/800_800_102400.jpg" },
    { name: "竹内希来里", url: "https://cdn.hinatazaka46.com/images/14/db3/b0ef9dd99d5d161d5c6a74ccded88/800_800_102400.jpg" },
    { name: "平尾帆夏", url: "https://cdn.hinatazaka46.com/images/14/b94/d6fb430765ba4e52e1dff3770ca74/800_800_102400.jpg" },
    { name: "平岡海月", url: "https://cdn.hinatazaka46.com/images/14/371/9264a91c28a52a627b6431b53bc6b/800_800_102400.jpg" },
    { name: "藤嶌果歩", url: "https://cdn.hinatazaka46.com/images/14/d93/562a91de03cf903757a8c78fdf0de/800_800_102400.jpg" },
    { name: "宮地すみれ", url: "https://cdn.hinatazaka46.com/images/14/ed9/4bf9b8c45c896fc82510b36fef853/800_800_102400.jpg" },
    { name: "山下葉留花", url: "https://cdn.hinatazaka46.com/images/14/239/c487339f2d9093124c05f45fdf7a2/800_800_102400.jpg" },
    { name: "渡辺莉奈", url: "https://cdn.hinatazaka46.com/images/14/4c4/b90f140e1bfddda84b099083159c1/800_800_102400.jpg" },
    { name: "大田美月", url: "https://cdn.hinatazaka46.com/images/14/325/4c87d9c8e738b16a035a9a8ac174d/800_800_102400.jpg" },
    { name: "大野愛実", url: "https://cdn.hinatazaka46.com/images/14/db5/593ef57f48945415097679c838dbc/800_800_102400.jpg" },
    { name: "片山紗希", url: "https://cdn.hinatazaka46.com/images/14/e92/c4ee448d69f4e440856329fc9dbec/800_800_102400.jpg" },
    { name: "蔵盛妃那乃", url: "https://cdn.hinatazaka46.com/images/14/934/a5fde0c1aa6626255c888fc4a0a0f/800_800_102400.jpg" },
    { name: "坂井新奈", url: "https://cdn.hinatazaka46.com/images/14/0ef/f301c0034434b8d1124862e96cd32/800_800_102400.jpg" },
    { name: "佐藤優羽", url: "https://cdn.hinatazaka46.com/images/14/2f7/3d8d0410361f8237a311082a85cff/800_800_102400.jpg" },
    { name: "下田衣珠季", url: "https://cdn.hinatazaka46.com/images/14/7c2/d7eb3651cf3c905eec9fc62261fe1/800_800_102400.jpg" },
    { name: "高井俐香", url: "https://cdn.hinatazaka46.com/images/14/962/d2eb46b321a8c8b15b0a588514344/800_800_102400.jpg" },
    { name: "鶴崎仁香", url: "https://cdn.hinatazaka46.com/images/14/7ae/60b2e53359c77316cd7d490c337b7/800_800_102400.jpg" },
    { name: "松尾桜", url: "https://cdn.hinatazaka46.com/images/14/fe4/1645f537167c2f6e7b3205fe0826e/800_800_102400.jpg" }
  ]
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAll() {
  const baseDir = path.join(__dirname, '..', 'assets', 'members');

  // Create directories for each group
  for (const group of Object.keys(memberData)) {
    const groupDir = path.join(baseDir, group);
    if (!fs.existsSync(groupDir)) {
      fs.mkdirSync(groupDir, { recursive: true });
    }
  }

  let successCount = 0;
  let errorCount = 0;

  for (const [group, members] of Object.entries(memberData)) {
    console.log(`\nDownloading ${group} members...`);

    for (const member of members) {
      const ext = path.extname(new URL(member.url).pathname);
      const filename = `${member.name}${ext}`;
      const filepath = path.join(baseDir, group, filename);

      try {
        console.log(`Downloading ${member.name}...`);
        await downloadImage(member.url, filepath);
        console.log(`✓ ${member.name}`);
        successCount++;
      } catch (error) {
        console.error(`✗ Failed to download ${member.name}: ${error.message}`);
        errorCount++;
      }

      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  console.log(`\n\nDownload complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
}

downloadAll();
