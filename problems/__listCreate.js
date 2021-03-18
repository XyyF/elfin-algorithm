const fs = require('fs');
const path = require('path');

const list = fs.readdirSync(path.join(__dirname, '../problems'));
const texts = [];
// 文件名正则匹配
const fileRegexp = /^(剑指Offer|面试题)?([\d]+\.)+[\u4E00-\u9FA5\w-]+\.md/g;
const contextRegexp = /\[(剑指Offer|面试题)?([\d]+\.)+[\u4E00-\u9FA5\w-]+\]\(https:\/\/leetcode-cn\.com\/.*\)/g;

for (let i = 0, l = list.length; i < l; i++) {
  const name = list[i];
  fileRegexp.lastIndex = 0;
  if (fileRegexp.test(name)) {
    texts.push(`- [${name}](./${name})`);
    const context = fs.readFileSync(path.join('./problems/', name), 'utf8');
    contextRegexp.lastIndex = 0;
    const result = context.match(contextRegexp);
    console.log(222, result);
  } else {
    console.log('未包含文件:', name);
  }
}

fs.writeFileSync(path.join(__dirname, './__list1.md'), texts.join('\n'));
