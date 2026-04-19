const fs = require('fs');
const path = require('path');

const tools = [
  { name: 'remove-bg', icon: 'crop' },
  { name: 'restore', icon: 'image-plus' },
  { name: 'colorize', icon: 'palette' },
  { name: 'designer', icon: 'palette' },
  { name: 'watermark', icon: 'eraser' },
  { name: 'remove-object', icon: 'scan' },
  { name: 'background', icon: 'mountain' },
  { name: 'face-cutout', icon: 'user' },
  { name: 'id-photo', icon: 'credit-card' },
  { name: 'product', icon: 'package' },
  { name: 'white-bg', icon: 'square' }
];

const basePath = 'f:/Ai Image Generator/ai-image-studio/src/app/pages/tools';

tools.forEach(tool => {
  const tsPath = path.join(basePath, tool.name, `${tool.name}.component.ts`);
  const htmlPath = path.join(basePath, tool.name, `${tool.name}.component.html`);
  
  console.log(`\nUpdating ${tool.name}...`);
  
  // Update TS file
  if (fs.existsSync(tsPath)) {
    let tsContent = fs.readFileSync(tsPath, 'utf8');
    
    // Replace LucideAngularModule import with IconComponent
    tsContent = tsContent.replace(
      /import { LucideAngularModule } from 'lucide-angular';/,
      "import { IconComponent } from '../../../shared/icon.component';"
    );
    
    // Replace in imports array
    tsContent = tsContent.replace(
      /imports: \[CommonModule, (FormsModule, )?RouterModule, LucideAngularModule\]/,
      (match, hasFormsModule) => {
        if (hasFormsModule) {
          return 'imports: [CommonModule, FormsModule, RouterModule, IconComponent]';
        }
        return 'imports: [CommonModule, RouterModule, IconComponent]';
      }
    );
    
    fs.writeFileSync(tsPath, tsContent, 'utf8');
    console.log(`  ✓ Updated ${tool.name}.component.ts`);
  }
  
  // Update HTML file
  if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Replace all lucide-icon with app-icon
    htmlContent = htmlContent.replace(
      /<lucide-icon/g,
      '<app-icon'
    );
    htmlContent = htmlContent.replace(
      /<\/lucide-icon>/g,
      '</app-icon>'
    );
    
    // Replace [style.color] with [color]
    htmlContent = htmlContent.replace(
      /\[style\.color\]/g,
      '[color]'
    );
    
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`  ✓ Updated ${tool.name}.component.html`);
  }
});

console.log('\n✅ All tools updated to use IconComponent!');
