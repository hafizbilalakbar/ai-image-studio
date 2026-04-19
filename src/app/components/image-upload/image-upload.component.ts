import { Component, signal, output, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="upload-container">
      <!-- Upload Zone -->
      <div 
        *ngIf="!previewUrl()" 
        class="upload-zone" 
        [class.drag-over]="dragOver()"
        [class.has-max-files]="hasMaxFiles()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="openFilePicker()">
        
        <input 
          #fileInput 
          type="file" 
          [accept]="acceptedTypes()"
          [multiple]="allowMultiple()"
          (change)="onFileSelected($event)"
          style="display: none;">
        
        <div class="upload-content">
          <div class="upload-icon-wrapper">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          
          <h3 class="upload-title">{{ uploadTitle() }}</h3>
          <p class="upload-subtitle">
            {{ dragText() }} or <span class="highlight">browse files</span>
          </p>
          
          <div class="upload-meta">
            <span class="meta-item">📁 {{ acceptedFormats() }}</span>
            <span class="meta-item">📐 Max {{ maxFileSize() }}MB</span>
            <span *ngIf="allowMultiple()" class="meta-item">📊 Up to {{ maxFiles() }} files</span>
          </div>
        </div>
      </div>

      <!-- Preview Grid -->
      <div *ngIf="previewUrl() && !isProcessing()" class="preview-grid" [class.single]="!allowMultiple()">
        <ng-container *ngIf="allowMultiple(); else singlePreview">
          <div *ngFor="let preview of previews(); let i = index" class="preview-card">
            <div class="preview-image-wrapper">
              <img [src]="preview.url" [alt]="preview.file.name" class="preview-image">
              <button class="remove-btn" (click)="removeFile(i)" title="Remove">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="preview-info">
              <span class="filename">{{ preview.file.name }}</span>
              <span class="filesize">{{ formatFileSize(preview.file.size) }}</span>
            </div>
          </div>
        </ng-container>
        
        <ng-template #singlePreview>
          <div class="preview-card single-card">
            <div class="preview-image-wrapper">
              <img [src]="previewUrl()" alt="Preview" class="preview-image">
            </div>
          </div>
        </ng-template>
      </div>

      <!-- Processing Overlay -->
      <div *ngIf="isProcessing()" class="processing-overlay">
        <div class="processing-content">
          <div class="spinner-ring"></div>
          <h3 class="processing-title">{{ processingTitle() }}</h3>
          <p class="processing-subtitle">{{ processingSubtitle() }}</p>
          <div *ngIf="showProgress()" class="progress-bar">
            <div class="progress-fill" [style.width.%]="progress()"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-container {
      position: relative;
      min-height: 300px;
    }

    .upload-zone {
      border: 2px dashed var(--surface-border);
      border-radius: var(--radius-xl);
      padding: 60px 40px;
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-normal);
      background: var(--bg-card);
      position: relative;
      overflow: hidden;
    }

    .upload-zone:hover:not(.has-max-files),
    .upload-zone.drag-over {
      border-color: var(--primary);
      background: rgba(16, 185, 129, 0.05);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .upload-zone.has-max-files {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .upload-icon-wrapper {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      animation: float 3s ease-in-out infinite;
    }

    .upload-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    .upload-subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    .highlight {
      color: var(--primary);
      font-weight: 600;
    }

    .upload-meta {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .meta-item {
      font-size: 0.85rem;
      color: var(--text-muted);
      padding: 6px 12px;
      background: var(--surface);
      border-radius: var(--radius-full);
    }

    /* Preview Grid */
    .preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }

    .preview-grid.single {
      grid-template-columns: 1fr;
    }

    .preview-card {
      background: var(--bg-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all var(--transition-normal);
    }

    .preview-card:hover {
      border-color: var(--primary);
      box-shadow: var(--shadow-md);
    }

    .preview-image-wrapper {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
    }

    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal);
    }

    .preview-card:hover .preview-image {
      transform: scale(1.05);
    }

    .remove-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(239, 68, 68, 0.9);
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      opacity: 0;
    }

    .preview-card:hover .remove-btn {
      opacity: 1;
    }

    .remove-btn:hover {
      background: rgba(239, 68, 68, 1);
      transform: scale(1.1);
    }

    .preview-info {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .filename {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .filesize {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    /* Processing Overlay */
    .processing-overlay {
      position: absolute;
      inset: 0;
      background: rgba(5, 8, 22, 0.95);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      border-radius: var(--radius-xl);
    }

    .processing-content {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .processing-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .processing-subtitle {
      font-size: 0.95rem;
      color: var(--text-secondary);
    }

    .progress-bar {
      width: 300px;
      height: 6px;
      background: var(--surface);
      border-radius: var(--radius-full);
      overflow: hidden;
      margin-top: 10px;
    }

    .progress-fill {
      height: 100%;
      background: var(--gradient-primary);
      transition: width 0.3s ease;
      border-radius: var(--radius-full);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @media (max-width: 640px) {
      .upload-zone {
        padding: 40px 20px;
      }

      .upload-meta {
        flex-direction: column;
        gap: 10px;
      }

      .preview-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ImageUploadComponent {
  // Inputs
  acceptedTypes = input('image/*');
  acceptedFormats = input('JPG, PNG, WebP');
  maxFileSize = input(10);
  allowMultiple = input(false);
  maxFiles = input(10);
  uploadTitle = input('Upload Your Image');
  dragText = input('Drop your image here');
  processingTitle = input('Processing...');
  processingSubtitle = input('AI is working on your image');
  showProgress = input(false);

  // State
  dragOver = signal(false);
  previewUrl = signal('');
  previews = signal<Array<{file: File, url: string}>>([]);
  selectedFiles = signal<File[]>([]);
  isProcessing = signal(false);
  progress = signal(0);

  // Outputs
  filesSelected = output<File[]>();
  fileRemoved = output<number>();

  private fileInput: HTMLInputElement | null = null;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.set(false);

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  openFilePicker() {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  private handleFiles(files: File[]) {
    const validFiles = files.filter(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.warn(`Invalid file type: ${file.name}`);
        return false;
      }

      // Validate file size
      const maxSize = this.maxFileSize() * 1024 * 1024;
      if (file.size > maxSize) {
        console.warn(`File too large: ${file.name}`);
        return false;
      }

      return true;
    });

    if (this.allowMultiple()) {
      const currentCount = this.selectedFiles().length;
      const availableSlots = this.maxFiles() - currentCount;
      const filesToAdd = validFiles.slice(0, availableSlots);

      const newFiles = [...this.selectedFiles(), ...filesToAdd];
      this.selectedFiles.set(newFiles);

      const newPreviews = [...this.previews()];
      filesToAdd.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push({ file, url: e.target?.result as string });
          this.previews.set([...newPreviews]);
        };
        reader.readAsDataURL(file);
      });

      if (newFiles.length > 0) {
        this.filesSelected.emit(newFiles);
      }
    } else {
      // Single file mode
      const file = validFiles[0];
      if (file) {
        this.selectedFiles.set([file]);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewUrl.set(e.target?.result as string);
          this.filesSelected.emit([file]);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeFile(index: number) {
    if (this.allowMultiple()) {
      const files = this.selectedFiles();
      const previews = this.previews();
      
      files.splice(index, 1);
      previews.splice(index, 1);
      
      this.selectedFiles.set([...files]);
      this.previews.set([...previews]);
      
      this.fileRemoved.emit(index);
      
      if (files.length === 0) {
        this.previewUrl.set('');
      }
    } else {
      this.selectedFiles.set([]);
      this.previewUrl.set('');
      this.fileRemoved.emit(0);
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  hasMaxFiles(): boolean {
    if (!this.allowMultiple()) return false;
    return this.selectedFiles().length >= this.maxFiles();
  }

  setProcessing(processing: boolean) {
    this.isProcessing.set(processing);
    if (processing) {
      this.progress.set(0);
      this.simulateProgress();
    }
  }

  private simulateProgress() {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 95) {
        current = 95;
        clearInterval(interval);
      }
      this.progress.set(current);
    }, 500);
  }

  setComplete() {
    this.progress.set(100);
    setTimeout(() => {
      this.isProcessing.set(false);
      this.progress.set(0);
    }, 500);
  }

  reset() {
    this.selectedFiles.set([]);
    this.previewUrl.set('');
    this.previews.set([]);
    this.isProcessing.set(false);
    this.progress.set(0);
    this.dragOver.set(false);
  }
}
