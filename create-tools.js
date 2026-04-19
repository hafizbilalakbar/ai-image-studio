const fs = require('fs');
const path = require('path');

const tools = [
  { id: 'remove-bg', name: 'Remove Background', title: 'Remove <span class="text-gradient">Background</span>', desc: 'Instantly remove backgrounds from any image with precision. Perfect for portraits, products, and creative compositions.', icon: '🎭', method: 'removeBg' },
  { id: 'restore', name: 'Restore Old Photo', title: 'Restore <span class="text-gradient">Old Photo</span>', desc: 'Bring old, damaged, and faded photographs back to life. AI repairs scratches, tears, and restores lost colors.', icon: '🖼️', method: 'restorePhoto' },
  { id: 'watermark', name: 'Watermark Remover', title: 'Remove <span class="text-gradient">Watermark</span>', desc: 'Cleanly remove watermarks, text overlays, and logos from images using intelligent inpainting technology.', icon: '🚫', method: 'removeWatermark' },
  { id: 'designer', name: 'AI Designer', title: 'AI <span class="text-gradient">Designer</span>', desc: 'Generate stunning images from text prompts. Your creative partner for art, illustrations, and imaginative visuals.', icon: '🎨', method: 'generateImage', isPrompt: true },
  { id: 'colorize', name: 'Colorize Photo', title: '<span class="text-gradient">Colorize</span> Photo', desc: 'Transform black & white photos into vivid color. AI analyzes content to apply historically accurate, natural colors.', icon: '🌈', method: 'colorizePhoto' },
  { id: 'remove-object', name: 'Remove Object', title: 'Remove <span class="text-gradient">Object</span>', desc: 'Select and erase any unwanted object from your photos. AI seamlessly fills the area with matching background content.', icon: '✂️', method: 'removeObject' },
  { id: 'background', name: 'AI Background', title: 'AI <span class="text-gradient">Background</span>', desc: 'Replace or generate stunning backgrounds for your images. Choose from artistic scenes, gradients, or custom AI creations.', icon: '🌅', method: 'generateBackground', isPrompt: true },
  { id: 'face-cutout', name: 'AI Face Cutout', title: 'AI <span class="text-gradient">Face Cutout</span>', desc: 'Automatically detect and isolate faces from photos with high precision. Perfect for profile pictures and portrait editing.', icon: '🤳', method: 'faceCutout' },
  { id: 'id-photo', name: 'ID Photo Maker', title: 'ID Photo <span class="text-gradient">Maker</span>', desc: 'Create professional passport, visa, and ID photos in seconds. Automatic sizing for all international ID photo standards.', icon: '🪪', method: 'makeIdPhoto' },
  { id: 'product', name: 'Product Retouch', title: 'Product <span class="text-gradient">Retouch</span>', desc: 'Enhance product photos for e-commerce. Remove blemishes, correct colors, and make your products look their best.', icon: '📦', method: 'retouchProduct' },
  { id: 'white-bg', name: 'White Background', title: 'White <span class="text-gradient">Background</span>', desc: 'Get e-commerce ready product images with clean white backgrounds. Optimized for Amazon, Shopify, and all major platforms.', icon: '⬜', method: 'whiteBg' }
];

const basePath = path.join(__dirname, 'src', 'app', 'pages', 'tools');

function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

for (const tool of tools) {
  const dirPath = path.join(basePath, tool.id);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const tsContent = `import { Component, signal, ElementRef, viewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageToolsService } from '../../../services/image-tools.service';

@Component({
  selector: 'app-${tool.id}',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './${tool.id}.component.html',
  styleUrls: ['../tools-shared.css']
})
export class ${toPascalCase(tool.id)}Component {
  private svc = inject(ImageToolsService);
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  selectedFile = signal<File | null>(null);
  previewUrl = signal('');
  resultUrl = signal('');
  isProcessing = signal(false);
  error = signal('');
  dragOver = signal(false);
  ${tool.isPrompt ? `prompt = signal('');` : ''}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) this.loadFile(input.files[0]);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) this.loadFile(file);
  }

  loadFile(file: File) {
    this.selectedFile.set(file);
    this.resultUrl.set('');
    this.error.set('');
    const reader = new FileReader();
    reader.onload = (e) => this.previewUrl.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  async process() {
    ${tool.id === 'designer' ? `if (!this.prompt()) return;` : `if (!this.selectedFile()) return;`}
    this.isProcessing.set(true);
    this.error.set('');
    try {
      ${tool.id === 'designer' 
        ? `const res = await this.svc.${tool.method}(this.prompt());` 
        : (tool.id === 'background' 
          ? `const res = await this.svc.${tool.method}(this.selectedFile()!, this.prompt());`
          : (tool.id === 'id-photo'
            ? `const res = await this.svc.${tool.method}(this.selectedFile()!, 'passport');`
            : `const res = await this.svc.${tool.method}(this.selectedFile()!);`))}
      this.resultUrl.set(res.url);
    } catch (e: any) {
      this.error.set(e?.error?.error || 'Failed to process image. Please try again.');
    } finally {
      this.isProcessing.set(false);
    }
  }

  download() {
    const url = this.resultUrl();
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = '${tool.id}-result.png';
    a.click();
  }

  reset() {
    this.selectedFile.set(null);
    this.previewUrl.set('');
    this.resultUrl.set('');
    this.error.set('');
    ${tool.isPrompt ? `this.prompt.set('');` : ''}
  }
}
`;

  let htmlContent = `<!-- ${tool.name} Tool -->
<div class="tool-page">
  <div class="tool-header">
    <div class="tool-icon-large">${tool.icon}</div>
    <div class="section-label">${tool.name}</div>
    <h1>${tool.title}</h1>
    <p>${tool.desc}</p>
  </div>

  <div class="tool-workspace">
`;

  if (tool.id === 'designer') {
    htmlContent += `    <!-- Prompt Zone -->
    <div *ngIf="!resultUrl()" class="prompt-zone">
      <div class="prompt-input-container">
        <textarea 
          [ngModel]="prompt()" 
          (ngModelChange)="prompt.set($event)" 
          placeholder="Describe the image you want to generate (e.g., 'A futuristic city at sunset, cyberpunk style, high detail...')"
          rows="4"
          class="prompt-textarea"></textarea>
      </div>
      <div class="preview-actions">
        <button class="btn-primary" (click)="process()" [disabled]="isProcessing() || !prompt()">
          <span *ngIf="!isProcessing()">✨ Generate Image</span>
          <span *ngIf="isProcessing()" class="flex-center gap-8">
            <span class="spinner-ring small"></span> Generating...
          </span>
        </button>
      </div>
    </div>
`;
  } else {
    htmlContent += `    <!-- Upload Zone -->
    <div *ngIf="!previewUrl()" class="upload-zone" [class.drag-over]="dragOver()"
         (dragover)="$event.preventDefault(); dragOver.set(true)"
         (dragleave)="dragOver.set(false)"
         (drop)="onDrop($event)">
      <input type="file" accept="image/*" (change)="onFileSelected($event)" #fileInput>
      <span class="upload-icon">📤</span>
      <p class="upload-text">Drop your image here or <strong style="color:#a78bfa">click to browse</strong></p>
      <p class="upload-subtext">Supports JPG, PNG, WebP · Max 10MB</p>
    </div>

    <!-- Preview & Process -->
    <div *ngIf="previewUrl() && !resultUrl()" class="preview-section">
      <div class="image-preview-card">
        <div class="preview-label">Original Image</div>
        <img [src]="previewUrl()" alt="Preview" class="preview-img">
        
        ${tool.isPrompt ? `<div class="prompt-input-container mt-4">
          <input 
            type="text"
            [ngModel]="prompt()" 
            (ngModelChange)="prompt.set($event)" 
            placeholder="Describe the new background (e.g., 'A beautiful beach at sunset')"
            class="prompt-input">
        </div>` : ''}

        <div class="preview-actions">
          <button class="btn-primary" (click)="process()" [disabled]="isProcessing()${tool.isPrompt ? ' || !prompt()' : ''}">
            <span *ngIf="!isProcessing()">✨ Process Image</span>
            <span *ngIf="isProcessing()" class="flex-center gap-8">
              <span class="spinner-ring small"></span> Processing...
            </span>
          </button>
          <button class="btn-secondary" (click)="reset()">Change Image</button>
        </div>
      </div>
    </div>
`;
  }

  htmlContent += `
    <div *ngIf="error()" class="error-banner">⚠️ {{ error() }}</div>

    <div *ngIf="isProcessing()" class="processing-overlay">
      <div class="spinner-ring"></div>
      <p class="processing-text">AI is working on your image...</p>
      <p style="font-size:0.8rem;color:#64748b">This may take 10-30 seconds</p>
    </div>

    <!-- Result -->
    <div *ngIf="resultUrl()" class="result-section">
      <div class="result-container">
        <div class="result-header">
          <h3>✅ Processing Complete</h3>
          <div class="result-actions">
            <button class="btn-outline" (click)="reset()">Start Over</button>
            <button class="btn-primary" (click)="download()">
              ⬇️ Download Result
            </button>
          </div>
        </div>
        ${tool.id === 'designer' ? `
        <div class="image-single-result">
          <img [src]="resultUrl()" alt="Generated Image">
        </div>
        ` : `
        <div class="image-compare">
          <div class="image-compare-item">
            <div class="image-compare-label">Before</div>
            <img [src]="previewUrl()" alt="Original">
          </div>
          <div class="image-compare-item">
            <div class="image-compare-label">After</div>
            <img [src]="resultUrl()" alt="Processed">
          </div>
        </div>
        `}
      </div>
    </div>
  </div>
</div>
`;

  fs.writeFileSync(path.join(dirPath, `${tool.id}.component.ts`), tsContent);
  fs.writeFileSync(path.join(dirPath, `${tool.id}.component.html`), htmlContent);
  console.log(`Created ${tool.id} tool`);
}

// Create tools-shared.css
const cssContent = `
.tool-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: calc(100vh - 80px);
}

.tool-header {
  text-align: center;
  margin-bottom: 3rem;
}

.tool-icon-large {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.tool-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.tool-header p {
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
}

.tool-workspace {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

/* Upload Zone */
.upload-zone {
  border: 2px dashed var(--border-color);
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.upload-zone:hover, .upload-zone.drag-over {
  border-color: var(--primary-color);
  background: rgba(124, 58, 237, 0.05);
}

.upload-zone input[type="file"] {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.upload-text {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.upload-subtext {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Prompts */
.prompt-zone {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.prompt-textarea {
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
}

.prompt-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.prompt-input-container {
  width: 100%;
}

.prompt-input {
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: white;
  font-family: inherit;
  font-size: 1rem;
}

.prompt-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.mt-4 {
  margin-top: 1rem;
}

/* Preview */
.image-preview-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.preview-label {
  align-self: flex-start;
  font-weight: 600;
  color: var(--text-secondary);
}

.preview-img {
  max-width: 100%;
  max-height: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.preview-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
}

/* Results */
.result-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.result-header h3 {
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.result-actions {
  display: flex;
  gap: 1rem;
}

.image-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .image-compare {
    grid-template-columns: 1fr;
  }
}

.image-compare-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.image-compare-label {
  font-weight: 500;
  text-align: center;
  color: var(--text-secondary);
}

.image-compare-item img, .image-single-result img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

/* Spinners and Overlays */
.processing-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 24px;
}

.spinner-ring {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(124, 58, 237, 0.2);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.spinner-ring.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
  margin-bottom: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.processing-text {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.error-banner {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  margin-top: 1rem;
  text-align: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.gap-8 { gap: 8px; }
`;
fs.writeFileSync(path.join(basePath, 'tools-shared.css'), cssContent);
console.log('Created tools-shared.css');
