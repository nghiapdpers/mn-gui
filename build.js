const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const componentMap = {
  MNColumn: 'mn-column',
  MNRow: 'mn-row',
  MNText: 'mn-text',
  MNSwitch: 'mn-switch',
  MNCheckbox: 'mn-checkbox',
  MNSlider: 'mn-slider',
  MNInput: 'mn-input',
  MNSelect: 'mn-select',
  MNButton: 'mn-button',
  MNScreen: 'mn-screen',
  MNBadge: 'mn-badge',
  MNDivider: 'mn-divider',
  MNAccordion: 'mn-accordion',
  MNColorPicker: 'mn-color-picker',
  MNToast: 'mn-toast'
};

function runBuild() {
  console.log('🔄 Building MNGUI...');
  try {
    ensureDir(path.join(__dirname, 'dist'));
    ensureDir(path.join(__dirname, 'dist/components'));

    // 1. Build main bundles
    console.log('📦 Bundling main library...');
    execSync('npx esbuild src/global.js --bundle --outfile=mngui.js', { stdio: 'inherit' });
    execSync('npx esbuild src/global.js --bundle --minify --outfile=mngui.min.js', { stdio: 'inherit' });
    
    // 2. Build Core bundle
    console.log('📦 Bundling MNGUI Core...');
    execSync('npx esbuild src/core-index.js --bundle --minify --outfile=dist/mngui-core.min.js', { stdio: 'inherit' });

    // 3. Build Modular Components
    console.log('📦 Bundling modular components...');
    for (const [componentName, outputName] of Object.entries(componentMap)) {
      const srcPath = path.join(__dirname, `src/components/${componentName}.js`);
      if (!fs.existsSync(srcPath)) continue;

      const content = fs.readFileSync(srcPath, 'utf8');
      
      // Strip imports and exports for global IIFE use
      const cleanContent = content
        .replace(/import\s+.*?;/g, '')
        .replace(/export\s+class\s+(\w+)/g, 'class $1')
        .trim();

      const iifeContent = `(function(root) {
  if (!root.BaseComponent && '${componentName}' !== 'MNToast') {
    console.error("${componentName} requires BaseComponent. Load mngui-core.min.js first.");
    return;
  }
  ${cleanContent}
  root.${componentName} = ${componentName};
})(typeof self !== 'undefined' ? self : this);`;

      const tempFile = path.join(__dirname, `temp_${componentName}.js`);
      const outFile = path.join(__dirname, `dist/components/${outputName}.min.js`);

      fs.writeFileSync(tempFile, iifeContent, 'utf8');
      execSync(`npx esbuild "${tempFile}" --minify --outfile="${outFile}"`, { stdio: 'ignore' });
      fs.unlinkSync(tempFile);
    }

    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
  }
}

runBuild();

if (isWatch) {
  console.log('👀 Watching src/ for changes...');
  let timeout = null;
  fs.watch(path.join(__dirname, 'src'), { recursive: true }, (eventType, filename) => {
    if (filename) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log(`\n🔄 Change detected in: ${filename}`);
        runBuild();
      }, 200);
    }
  });
}
