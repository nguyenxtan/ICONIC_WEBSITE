const fs = require('fs');
const path = require('path');

const brochureDir = path.join(__dirname, '../brochure');
const publicDir = path.join(__dirname, '../public');
const brochuresPublicDir = path.join(publicDir, 'brochures');

// Create brochures directory in public if it doesn't exist
if (!fs.existsSync(brochuresPublicDir)) {
  fs.mkdirSync(brochuresPublicDir, { recursive: true });
  console.log('Created /public/brochures directory');
}

// Copy PDF files to public directory
const pdfFiles = fs.readdirSync(brochureDir).filter(file => file.endsWith('.pdf'));

pdfFiles.forEach(file => {
  const sourcePath = path.join(brochureDir, file);
  const destPath = path.join(brochuresPublicDir, file);

  fs.copyFileSync(sourcePath, destPath);
  console.log(`Copied: ${file}`);
});

console.log(`\nSuccessfully prepared ${pdfFiles.length} brochure files for display`);
