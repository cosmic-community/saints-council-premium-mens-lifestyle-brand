const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    return;
  }
  
  content = content.replace('</head>', `  ${scriptTag}\n  </head>`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Injected console capture script into ${filePath}`);
}

const outDir = path.join(process.cwd(), '.next', 'server', 'app');

if (fs.existsSync(outDir)) {
  const files = fs.readdirSync(outDir, { recursive: true });
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      injectScript(path.join(outDir, file));
    }
  });
}

console.log('Console capture script injection complete');