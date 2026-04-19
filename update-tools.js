const fs = require('fs');
const path = require('path');

const tools = [
  { name: 'restore', icon: 'image-plus', method: 'restorePhoto', file: 'restore-result.png' },
  { name: 'colorize', icon: 'palette', method: 'colorizePhoto', file: 'colorize-result.png' },
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
  const htmlPath = path.join(basePath, tool.name, `${tool.name}.component.html`);
  
  console.log(`Updating ${tool.name}...`);
  
  // Update TS file
  if (fs.existsSync(tsPath)) {
    let tsContent = fs.readFileSync(tsPath, 'utf8');
    
    // Update imports
    tsContent = tsContent.replace(
      /import { Component, signal, ElementRef, viewChild(, inject)? } from '@angular\/core';/,
      "import { Component, signal, ElementRef, viewChild, inject } from '@angular/core';"
    );
    tsContent = tsContent.replace(
      /import { ImageToolsService } from '\.\.\/\.\.\/\.\.\/services\/image-tools\.service';/,
      "import { LucideAngularModule } from 'lucide-angular';\nimport { ClientImageProcessor } from '../../../services/client-image-processor.service';"
    );
    
    // Update component decorator
    tsContent = tsContent.replace(
      /imports: \[CommonModule, FormsModule, RouterModule\]/,
      'imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule]'
    );
    
    // Update service injection
    tsContent = tsContent.replace(
      /private svc = (new ImageToolsService\(\)|inject\(ImageToolsService\));/,
      'private processor = inject(ClientImageProcessor);'
    );
    
    // Update process method
    if (tool.hasPrompt) {
      tsContent = tsContent.replace(
        /const res = await this\.svc\.\w+\(this\.selectedFile\(\)!,.*?\);/s,
        `const res = await this.processor.${tool.method}(this.selectedFile()!, this.prompt());`
      );
    } else {
      tsContent = tsContent.replace(
        /const res = await this\.svc\.\w+\(this\.selectedFile\(\)!\);/,
        `const res = await this.processor.${tool.method}(this.selectedFile()!);`
      );
    }
    
    // Update error handling
    tsContent = tsContent.replace(
      /this\.error\.set\(e\?\.error\?\.error \|\|/g,
      'this.error.set(e?.message ||'
    );
    
    // Update download method
    tsContent = tsContent.replace(
      /const a = document\.createElement\('a'\);\s*a\.href = url;\s*a\.download = '.*?';\s*a\.click\(\);/s,
      `this.processor.downloadImage(url, '${tool.file}');`
    );
    
    tsContent = tsContent.replace(
      /this\.svc\.downloadImage\(url, '.*?'\);/,
      `this.processor.downloadImage(url, '${tool.file}');`
    );
    
    fs.writeFileSync(tsPath, tsContent, 'utf8');
    console.log(`  ✓ Updated ${tool.name}.component.ts`);
  }
  
  // Update HTML file
  if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Replace tool icon
    htmlContent = htmlContent.replace(
      /<div class="tool-icon-large">.*?<\/div>/,
      `<lucide-icon [name]="'${tool.icon}'" [size]="48" class="tool-icon-large"></lucide-icon>`
    );
    
    // Replace upload icon
    htmlContent = htmlContent.replace(
      /<span class="upload-icon">.*?<\/span>/,
      `<lucide-icon [name]="'upload-cloud'" [size]="48" class="upload-icon"></lucide-icon>`
    );
    
    // Replace button text icon
    htmlContent = htmlContent.replace(
      /<span \*ngIf="!isProcessing\(\)">.*?<\/span>/,
      `<span *ngIf="!isProcessing()" class="flex-center gap-8">
              <lucide-icon [name]="'${tool.icon}'" [size]="16"></lucide-icon>
              Process Image
            </span>`
    );
    
    // Replace error banner
    htmlContent = htmlContent.replace(
      /<div \*ngIf="error\(\)" class="error-banner">.*?<\/div>/,
      `<div *ngIf="error()" class="error-banner">
        <lucide-icon [name]="'alert-circle'" [size]="16"></lucide-icon>
        {{ error() }}
      </div>`
    );
    
    // Replace success header
    htmlContent = htmlContent.replace(
      /<h3>✅ .*?<\/h3>/,
      `<h3>
            <lucide-icon [name]="'check-circle'" [size]="20"></lucide-icon>
            Processing Complete
          </h3>`
    );
    
    // Replace download button
    htmlContent = htmlContent.replace(
      /⬇️ Download Result/,
      `<lucide-icon [name]="'download'" [size]="16"></lucide-icon>
              Download Result`
    );
    
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`  ✓ Updated ${tool.name}.component.html`);
  }
});

console.log('\n✅ All tools updated!');
