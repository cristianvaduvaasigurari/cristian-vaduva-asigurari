/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname);
const TARGET_DIR = path.join(ROOT, 'src');

const replaceMap = {
  'Comprehensive': 'beneficiu',
  'High‑quality': 'acces rapid pentru tine',
  'Unique': 'acces exclusiv pentru tine',
  'Top': 'soluție de top pentru tine',
  'Expert': 'serviciu practic pentru tine',
  'High‑quality': 'serviciu avansat pentru tine',
  'Bespoke': 'adaptat nevoilor tale',
  'World-Class': 'standard înalt pentru tine',
  'Outstanding': 'excepțional pentru tine',
  'Top Quality': 'calitate superioară pentru tine',
  'Excellence': 'excelență pentru tine',
  'Superior': 'superior pentru tine',
  'Reputable': 'prestigiu pentru tine',
  'Custom': 'personalizat pentru tine',
  'Customized': 'personalizat pentru tine',
  'Complete': 'complet pentru tine',
  'Best': 'cel mai bun pentru tine',
  'High': 'valoare mare pentru tine',
  'Top': 'top pentru tine',
  'Comprehensive Experience': 'experiență completă pentru tine',
  'Comprehensive Service': 'serviciu complet pentru tine',
  'High‑quality Service': 'serviciu de înaltă calitate pentru tine',
  'High‑quality Properties': 'proprietăți cu beneficii pentru tine',
  'Comprehensive Protection': 'protecție completă pentru tine',
  'comprehensive solutions': 'soluții pentru tine',
  'Custom Solutions': 'soluții adaptate nevoilor tale',
  'Expert Advice': 'sfaturi practice pentru tine',
  'Expert Service': 'serviciu de încredere pentru tine',
  'Personal': 'pentru tine'
};

function replaceInFile(filePath) {
  if (!filePath.match(/\.(tsx|ts|jsx|js|md|html)$/)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  for (const [key, val] of Object.entries(replaceMap)) {
    const regex = new RegExp('\\b' + key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'g');
    content = content.replace(regex, val);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else {
      replaceInFile(fullPath);
    }
  }
}

walk(TARGET_DIR);
console.log('Copy rewrite finished');
