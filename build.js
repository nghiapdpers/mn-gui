const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'mngui.js');
const outputFile = path.join(__dirname, 'mngui.min.js');

console.log('👀 MNGUI Auto-Builder is running...');
console.log(`Watching for changes in: ${sourceFile}`);

let timeout = null;

fs.watch(sourceFile, (eventType) => {
  if (eventType === 'change') {
    // Debounce to prevent multiple compilations on double-saves
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('🔄 File changed, compiling...');
      exec('npx terser mngui.js -o mngui.min.js --compress --mangle', (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Build error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`⚠️ Stderr: ${stderr}`);
        }
        console.log('✅ Successfully compiled to mngui.min.js!');
      });
    }, 150);
  }
});
