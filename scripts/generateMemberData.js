const fs = require('fs');
const path = require('path');

const groups = {
  '櫻坂46': [],
  '乃木坂46': [],
  '日向坂46': []
};

const membersDir = path.join(__dirname, '..', 'public', 'images', 'members');

// Read all images from each group folder
for (const group of Object.keys(groups)) {
  const groupDir = path.join(membersDir, group);

  if (fs.existsSync(groupDir)) {
    const files = fs.readdirSync(groupDir);

    for (const file of files) {
      if (file.endsWith('.jpg')) {
        const name = file.replace('.jpg', '');
        const imagePath = `/images/members/${group}/${file}`;
        groups[group].push({ name, imageSrc: imagePath });
      }
    }

    // Sort by name
    groups[group].sort((a, b) => a.name.localeCompare(b.name, 'ja'));
  }
}

// Generate TypeScript/JavaScript code
console.log('// Generated member data with local image paths');
console.log('// You can store these paths in a database and fetch them dynamically\n');
console.log('const memberImages: { [key: string]: { name: string; imageSrc: string }[] } = {');

for (const [group, members] of Object.entries(groups)) {
  console.log(`  "${group}": [`);
  members.forEach((member, index) => {
    const comma = index < members.length - 1 ? ',' : '';
    console.log(`    { name: "${member.name}", imageSrc: "${member.imageSrc}" }${comma}`);
  });
  console.log('  ],');
}

console.log('};\n');

// Also generate a simple JSON format for database seeding
const jsonOutput = path.join(__dirname, 'memberData.json');
fs.writeFileSync(jsonOutput, JSON.stringify(groups, null, 2));
console.log(`\n✅ JSON data written to: ${jsonOutput}`);
console.log('\nThis JSON can be used to seed your database.');
