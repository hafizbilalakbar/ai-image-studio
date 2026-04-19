const fs = require('fs');
const path = require('path');

const tools = [
  { name: 'watermark', icon: 'eraser', method: 'removeWatermark', file: 'watermark-removed.png' },
  { name: 'remove-object', icon: 'scan', method: 'removeObject', file: 'object-removed.png' },
  { name: 'background', icon: 'mountain', method: 'generateBackground', file: 'background-added.png', hasPrompt: true },
  { name: 'face-cutout', icon: 'user', method: 'faceCutout', file: 'face-cutout.png' },
  { name: 'id-photo', icon: 'credit-card', method: 'makeIdPhoto', file: 'id-photo.png' },
  { name: 'product', icon: 'package', method: 'retouchProduct', file: 'product-retouched.png' },
  { name: 'white-bg', icon: 'square', method: 'whiteBg', file: 'white-bg.png' }
];

const basePath = 'f:/Ai Image Generator/ai-image-studio/src/app/pages/tools';

tools.forEach(tool => {
  const tsPath = path.join(basePath, tool.name, `${tool.name}.component.ts`);
  
  console.log(`\nFixing ${tool.name}...`);
  
  if (fs.existsSync(tsPath)) {
    let tsContent = fs.readFileSync(tsPath, 'utf8');
    
    // Replace ImageToolsService import
    tsContent = tsContent.replace(
      /import { ImageToolsService } from '\.\.\/\.\.\/\.\.\/services\/image-tools\.service';/,
      "import { IconComponent } from '../../../shared/icon.component';\nimport { ClientImageProcessor } from '../../../services/client-image-processor.service';"
    );
    
    // Add inject import if not present
    if (!tsContent.includes(', inject }')) {
      tsContent = tsContent.replace(
        /import { Component, signal, ElementRef, viewChild }/,
        "import { Component, signal, ElementRef, viewChild, inject }"
      );
    }
    
    // Update imports array
    tsContent = tsContent.replace(
      /imports: \[CommonModule, FormsModule, RouterModule\]/,
      'imports: [CommonModule, FormsModule, RouterModule, IconComponent]'
    );
    
    // Replace service instantiation/injection
    tsContent = tsContent.replace(
      /private svc = (new ImageToolsService\(\)|inject\(ImageToolsService\));/,
      'private processor = inject(ClientImageProcessor);'
    );
    
    // Update process method - with prompt
    if (tool.hasPrompt) {
      tsContent = tsContent.replace(
        /const res = await this\.svc\.\w+\(this\.selectedFile\(\)!,.*?\);/s,
        `const res = await this.processor.${tool.method}(this.selectedFile()!, this.prompt());`
      );
    } else {
      // Update process method - without prompt
      tsContent = tsContent.replace(
        /const res = await this\.svc\.\w+\(this\.selectedFile\(\)!\);/,
        `const res = await this.processor.${tool.method}(this.selectedFile()!);`
      );
    }
    
    // Update error handling
    tsContent = tsContent.replace(
      /this\.error\.set\(e\?\.error\?\.error \|\| 'Failed/g,
      "this.error.set(e?.message || 'Failed"
    );
    
    // Update download method
    tsContent = tsContent.replace(
      /const a = document\.createElement\('a'\);\s*a\.href = url;\s*a\.download = '.*?';\s*a\.click\(\);/gs,
      `this.processor.downloadImage(url, '${tool.file}');`
    );
    
    fs.writeFileSync(tsPath, tsContent, 'utf8');
    console.log(`  ✓ Fixed ${tool.name}.component.ts`);
  }
});

console.log('\n✅ All remaining tools fixed!');
