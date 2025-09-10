import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built HTML file
const htmlPath = path.join(__dirname, 'build', 'index.html');
const assetsDir = path.join(__dirname, 'build', 'assets');

try {
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Find CSS file dynamically
  const cssFiles = fs.readdirSync(assetsDir).filter(file => file.endsWith('.css'));
  if (cssFiles.length === 0) {
    throw new Error('No CSS files found in assets directory');
  }
  const cssFile = cssFiles[0];
  const cssPath = path.join(assetsDir, cssFile);
  
  // Find JS file dynamically
  const jsFiles = fs.readdirSync(assetsDir).filter(file => file.endsWith('.js'));
  if (jsFiles.length === 0) {
    throw new Error('No JS files found in assets directory');
  }
  const jsFile = jsFiles[0];
  const jsPath = path.join(assetsDir, jsFile);
  
  console.log(`Found CSS file: ${cssFile}`);
  console.log(`Found JS file: ${jsFile}`);
  
  // Read CSS content
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Read JS content
  const jsContent = fs.readFileSync(jsPath, 'utf8');
  
  // Replace CSS link with inline style (match exact pattern)
  const cssPattern = `<link rel="stylesheet" crossorigin href="./assets/${cssFile}">`;
  html = html.replace(cssPattern, `<style>${cssContent}</style>`);
  
  // Replace JS script with inline script (match exact pattern)
  const jsPattern = `<script type="module" crossorigin src="./assets/${jsFile}"></script>`;
  html = html.replace(jsPattern, `<script type="module">${jsContent}</script>`);
  
  // Write the combined HTML file
  fs.writeFileSync(htmlPath, html);
  
  console.log('✅ Successfully combined CSS and JS into HTML file');
  console.log('📁 You can now open build/index.html directly in your browser');
  
} catch (error) {
  console.error('❌ Error combining files:', error.message);
}
