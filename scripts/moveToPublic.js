const fs = require('fs');
const path = require('path');

const sourceBase = path.join(__dirname, '..', 'assets', 'members');
const targetBase = path.join(__dirname, '..', 'public', 'images', 'members');

const groups = ['櫻坂46', '乃木坂46', '日向坂46'];

// Create target directories
for (const group of groups) {
  const targetDir = path.join(targetBase, group);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
}

// Copy files
for (const group of groups) {
  const sourceDir = path.join(sourceBase, group);
  const targetDir = path.join(targetBase, group);

  if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);

    console.log(`\nCopying ${group} images...`);
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ ${file}`);
    }
  }
}

console.log('\n✅ All images copied to public/images/members/');
console.log('\nYou can now reference images like:');
console.log('  /images/members/櫻坂46/武元唯衣.jpg');
console.log('  /images/members/乃木坂46/岩本蓮加.jpg');
console.log('  /images/members/日向坂46/金村美玖.jpg');
