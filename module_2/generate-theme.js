// вызов утилиты с параметром "theme-2"
// node generate-theme.js theme-2

import fs from 'fs/promises';
import path from 'path';
// import {fileURLToPath} from 'url';

// const __fileName = fileURLToPath(import.meta.url);
// const __dirName = path.dirname(__fileName);
// console.log('__fileName', __fileName);
// console.log('__dirName', __dirName);

const urlArgs = process.argv;
// console.log('urlArgs', urlArgs)

const __fileName = urlArgs[1];
const __dirName = path.dirname(__fileName);
const themeName = urlArgs[2] || 'theme-1'
// console.log('__fileName', __fileName);
// console.log('__dirName', __dirName);
// console.log('themeName', themeName);

const configPath = path.join(__dirName, `./configs/${themeName}.json`);
const configThemeBasicPath = path.join(__dirName, `./configs/theme-basic.css`);
const themesDir = path.join(__dirName, `./themes`);
const outputPath = path.join(__dirName, `./themes/${themeName}.css`);
// console.log('configPath', configPath);
// console.log('configThemeBasicPath', configThemeBasicPath)
// console.log('themesDir', themesDir);
// console.log('outputPath', outputPath);

const configData = await fs.readFile(configPath, 'utf-8');
const config = JSON.parse(configData);
// console.log('config', config)

const generatedCss = `
/* generated CSS from ${themeName}.json */
head {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.h1 {
  ${config.h1}
}

${config.h2 
  ? `.h2 { ${config.h2}}`
  :''}

${config.h3
  ? `.h3 { ${config.h3}}`
  :''}  
  
`
// console.log('generatedCss', generatedCss)

await fs.mkdir(themesDir, {recursive: true});
await fs.copyFile(configThemeBasicPath, outputPath);
await fs.appendFile(outputPath, generatedCss, 'utf-8');
console.log(`file successfully saved ${outputPath}`)
