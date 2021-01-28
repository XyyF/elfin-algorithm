const fs = require('fs');
const path = require('path');

const list = fs.readdirSync(path.join(__dirname, '../problems'));

let texts = list.map(e => {
  return `- [${e}](./${e})`;
});

fs.writeFileSync(path.join(__dirname, './__list.md'), texts.join('\n'))
