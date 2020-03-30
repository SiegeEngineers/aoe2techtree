//
// Ths is a NodeJS script that grabs data/data.json and generates 2 files:
//
// 1) "data/just-data.json" --- Same as data.json, but without the "key_value" property.
// 2) "data/en/strings.json" -- Contains only the "key_value" properties from "data.json"
//
// NOTE: Ideally, the python scripts that generate data/data.json would be updated to instead
//       generate the 2 files this script generates.
//
// RUN from repository root:
//
//     node scripts/extractLocales.js
//
//
const fs = require('fs');

const IN_EN_FILE = './data/data.json';
const OUT_EN_JUST_DATA = './data/just-data.json';
const OUT_EN_STRINGS = './data/locales/en/strings.json';
const INDENTATION = 4;

// Read
const content = fs.readFileSync(IN_EN_FILE);
const contentJson = JSON.parse(content);

// Write 
const stringsContent = JSON.stringify(contentJson.key_value, null, INDENTATION);
fs.writeFileSync(OUT_EN_STRINGS, stringsContent);

// Write 
delete contentJson.key_value;
const justContent = JSON.stringify(contentJson, null, INDENTATION);
fs.writeFileSync(OUT_EN_JUST_DATA, justContent);

console.log('Done!')