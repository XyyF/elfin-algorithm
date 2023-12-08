const fs = require('fs');
const path = require('path');

const tagJson = {
  "nosetting": [],
};

deep('../normal');
deep('../剑指Offer');
deep('../面试题');

function deep(temPath) {
  // 所有文件
  const list = fs.readdirSync(path.join(__dirname, temPath));
  for (let i = 0, l = list.length; i < l; i++) {
    const name = list[i];
    const contexts = fs.readFileSync(path.join(__dirname, temPath, name), 'utf8').split('\n');
    const tagLine = contexts.find(e => e.startsWith('Tags:'));

    if (tagLine) {
      const tags = tagLine.slice(5).replace(/[\r\s]/g, '').split('|');
      if (tags && tags.length > 0) {
        tags.forEach((tag) => {
          if (!tagJson[tag]) tagJson[tag] = [];
          tagJson[tag].push(temPath + '/' + name);
        });
        continue;
      }
    }
    tagJson.nosetting.push(temPath + '/' + name);
  }
}

fs.writeFileSync(path.join(__dirname, './tag.json'), JSON.stringify(tagJson, null, '\t'));
