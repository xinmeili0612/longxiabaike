const fs = require('fs');
const required = [
  'miniprogram/app.json',
  'miniprogram/pages/index/index.wxml',
  'miniprogram/pages/intro/intro.wxml',
  'miniprogram/pages/get-started/get-started.wxml',
  'miniprogram/pages/skills/skills.wxml',
  'miniprogram/pages/cases/cases.wxml',
  'miniprogram/pages/path/path.wxml'
];
const missing = required.filter(p => !fs.existsSync(p));
if (missing.length) {
  console.error('Missing files:', missing);
  process.exit(1);
}
console.log('MVP structure OK');
