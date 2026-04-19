import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/icon.component';
import { ClientImageProcessor, ProcessResult } from '../../../services/client-image-processor.service';
import { SessionService } from '../../../services/session.service';

interface BatchResult {
  filename: string;
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

@Component({
  selector: 'app-batch-process',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="tool-page">
      <div class="tool-header">
        <app-icon [name]="'layers'" [size]="48" class="tool-icon-large"></app-icon>
        <div class="section-label">Batch Processing</div>
        <h1>Process <span class="text-gradient">Multiple Images</span></h1>
        <p>Upload up to 10 images and process them all at once with AI. Save time with bulk operations.</p>
      </div>

      <div class="tool-workspace">
        <!-- Tool Selection -->
        <div *ngIf="!isProcessing()" class="options-panel">
          <h3>Select AI Tool</h3>
          <div class="options-grid">
            <button *ngFor="let tool of availableTools" 
                    class="option-btn" 
                    [class.active]="selectedTool() === tool.id"
                    (click)="selectedTool.set(tool.id)">
              <span class="tool-icon">{{ tool.icon }}</span>
              <span>{{ tool.name }}</span>
            </button>
          </div>
        </div>

        <!-- Upload Zone -->
        <div *ngIf="!isProcessing() && selectedFiles().length === 0" class="upload-zone" 
             [class.drag-over]="dragOver()"
             (dragover)="onDragOver($event)"
             (dragleave)="onDragLeave($event)"
             (drop)="onDrop($event)">
          <input type="file" accept="image/*" multiple (change)="onFileSelected($event)" #fileInput>
          <span class="upload-icon">📤</span>
          <p class="upload-text">Drop multiple images here or <strong style="color:#34d399">click to browse</strong></p>
          <p class="upload-subtext">Supports JPG, PNG, WebP · Max 10 images · 10MB each</p>
        </div>

        <!-- File Preview Grid -->
        <div *ngIf="!isProcessing() && selectedFiles().length > 0" class="preview-section">
          <div class="preview-header">
            <h3>{{ selectedFiles().length }} Image(s) Selected</h3>
            <div class="preview-actions">
              <button class="btn-primary" (click)="processBatch()" [disabled]="!selectedTool()">
                ✨ Process All Images
              </button>
              <button class="btn-secondary" (click)="clearAll()">Clear All</button>
            </div>
          </div>

          <div class="file-grid">
            <div *ngFor="let file of selectedFiles(); let i = index" class="file-card">
              <div class="file-preview">
                <img [src]="file.preview" [alt]="file.name">
                <button class="remove-btn" (click)="removeFile(i)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div class="file-info">
                <p class="file-name">{{ file.name }}</p>
                <p class="file-size">{{ formatSize(file.size) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Processing Progress -->
        <div *ngIf="isProcessing()" class="processing-section">
          <div class="progress-header">
            <h3>Processing Images...</h3>
            <p>{{ completedCount() }} / {{ batchResults().length }} completed</p>
          </div>
          
          <div class="progress-bar-container">
            <div class="progress-bar-fill" [style.width.%]="progressPercentage"></div>
          </div>

          <div class="results-grid">
            <div *ngFor="let result of batchResults()" class="result-card" [class.status]="result.status">
              <div class="result-status">
                <span *ngIf="result.status === 'pending'" class="status-icon">⏳</span>
                <span *ngIf="result.status === 'processing'" class="status-icon spinner">⚙️</span>
                <span *ngIf="result.status === 'completed'" class="status-icon">✅</span>
                <span *ngIf="result.status === 'error'" class="status-icon">❌</span>
                <span class="status-text">{{ result.status | titlecase }}</span>
              </div>
              <p class="result-filename">{{ result.filename }}</p>
              <div *ngIf="result.status === 'completed'" class="result-actions">
                <button class="btn-outline small" (click)="downloadResult(result)">Download</button>
              </div>
            </div>
          </div>

          <div *ngIf="allCompleted" class="complete-actions">
            <button class="btn-primary" (click)="downloadAll()">
              ⬇️ Download All
            </button>
            <button class="btn-secondary" (click)="reset()">
              Process More Images
            </button>
          </div>
        </div>

        <!-- Error -->
        <div *ngIf="error()" class="error-banner">⚠️ {{ error() }}</div>
      </div>
    </div>
  `,
  styles: [`
    .options-panel {
      margin-bottom: 2rem;
    }

    .tool-icon {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--surface-border);
    }

    .preview-header h3 {
      font-size: 1.3rem;
      font-weight: 600;
    }

    .preview-actions {
      display: flex;
      gap: 1rem;
    }

    .file-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .file-card {
      background: var(--bg-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all var(--transition-normal);
    }

    .file-card:hover {
      border-color: var(--primary);
      box-shadow: var(--shadow-md);
    }

    .file-preview {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
    }

    .file-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
      opacity: 0;
      transition: all var(--transition-fast);
    }

    .file-card:hover .remove-btn {
      opacity: 1;
    }

    .remove-btn:hover {
      background: #ef4444;
      transform: scale(1.1);
    }

    .file-info {
      padding: 12px;
    }

    .file-name {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 4px;
    }

    .file-size {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .processing-section {
      padding: 2rem 0;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .progress-header h3 {
      font-size: 1.3rem;
      font-weight: 600;
    }

    .progress-header p {
      color: var(--text-secondary);
    }

    .progress-bar-container {
      width: 100%;
      height: 8px;
      background: var(--surface);
      border-radius: var(--radius-full);
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .progress-bar-fill {
      height: 100%;
      background: var(--gradient-primary);
      transition: width 0.3s ease;
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .result-card {
      background: var(--bg-card);
      border: 1px solid var(--surface-border);
      border-radius: var(--radius-md);
      padding: 1rem;
    }

    .result-card.status-completed {
      border-color: var(--success);
    }

    .result-card.status-error {
      border-color: var(--error);
    }

    .result-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .status-icon {
      font-size: 1.2rem;
    }

    .status-icon.spinner {
      animation: spin 1s linear infinite;
    }

    .status-text {
      font-size: 0.85rem;
      font-weight: 500;
    }

    .result-filename {
      font-size: 0.8rem;
      color: var(--text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 0.5rem;
    }

    .result-actions {
      margin-top: 0.5rem;
    }

    .complete-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--surface-border);
    }

    .btn-outline.small {
      padding: 6px 12px;
      font-size: 0.85rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .preview-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      .preview-actions {
        width: 100%;
      }

      .preview-actions button {
        flex: 1;
      }

      .complete-actions {
        flex-direction: column;
      }
    }
  `]
})
export class BatchProcessComponent {
  private processor = inject(ClientImageProcessor);
  private sessionSvc = inject(SessionService);

  selectedTool = signal('');
  selectedFiles = signal<Array<{file: File, name: string, size: number, preview: string}>>([]);
  batchResults = signal<BatchResult[]>([]);
  isProcessing = signal(false);
  error = signal('');
  dragOver = signal(false);
  completedCount = signal(0);

  availableTools = [
    { id: 'enhance', name: 'Enhance', icon: 'sparkles' },
    { id: 'remove-bg', name: 'Remove BG', icon: 'crop' },
    { id: 'restore', name: 'Restore', icon: 'image-plus' },
    { id: 'colorize', name: 'Colorize', icon: 'palette' },
    { id: 'product', name: 'Product', icon: 'package' },
    { id: 'white-bg', name: 'White BG', icon: 'square' }
  ];

  get progressPercentage(): number {
    if (this.batchResults().length === 0) return 0;
    return (this.completedCount() / this.batchResults().length) * 100;
  }

  get allCompleted(): boolean {
    return this.completedCount() === this.batchResults().length && this.batchResults().length > 0;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files) this.handleFiles(Array.from(files));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.handleFiles(Array.from(input.files));
  }

  private handleFiles(files: File[]) {
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) return false;
      if (file.size > 10 * 1024 * 1024) return false; // 10MB limit
      return true;
    }).slice(0, 10); // Max 10 files

    const newFiles = validFiles.map(file => ({
      file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file)
    }));

    this.selectedFiles.set([...this.selectedFiles(), ...newFiles]);
  }

  removeFile(index: number) {
    const files = this.selectedFiles();
    URL.revokeObjectURL(files[index].preview);
    files.splice(index, 1);
    this.selectedFiles.set([...files]);
  }

  clearAll() {
    this.selectedFiles().forEach(f => URL.revokeObjectURL(f.preview));
    this.selectedFiles.set([]);
  }

  async processBatch() {
    if (!this.selectedTool() || this.selectedFiles().length === 0) return;

    this.isProcessing.set(true);
    this.error.set('');
    this.completedCount.set(0);

    const files = this.selectedFiles().map(f => f.file);
    
    // Initialize results
    this.batchResults.set(
      files.map(f => ({
        filename: f.name,
        url: '',
        status: 'pending' as const
      }))
    );

    try {
      // Process each file sequentially
      for (let i = 0; i < files.length; i++) {
        // Update status to processing
        const results = this.batchResults();
        results[i].status = 'processing';
        this.batchResults.set([...results]);

        try {
          // Call appropriate tool API
          let result: ProcessResult;
          switch (this.selectedTool()) {
            case 'enhance':
              result = await this.processor.enhanceImage(files[i]);
              break;
            case 'remove-bg':
              result = await this.processor.removeBackground(files[i]);
              break;
            case 'restore':
              result = await this.processor.restorePhoto(files[i]);
              break;
            case 'colorize':
              result = await this.processor.colorizePhoto(files[i]);
              break;
            case 'product':
              result = await this.processor.retouchProduct(files[i]);
              break;
            case 'white-bg':
              result = await this.processor.whiteBg(files[i]);
              break;
            default:
              throw new Error('Invalid tool selected');
          }

          // Update status to completed
          results[i].url = result.url;
          results[i].status = 'completed';
          this.batchResults.set([...results]);
          this.completedCount.set(this.completedCount() + 1);

          // Save to session
          this.sessionSvc.saveProject({
            tool: this.selectedTool(),
            originalImage: this.selectedFiles()[i].preview,
            resultImage: result.url,
            settings: { batch: true }
          });

        } catch (err) {
          results[i].status = 'error';
          this.batchResults.set([...results]);
          this.completedCount.set(this.completedCount() + 1);
        }
      }
    } catch (e: any) {
      this.error.set(e?.message || 'Batch processing failed');
    } finally {
      this.isProcessing.set(false);
    }
  }

  downloadResult(result: BatchResult) {
    if (result.url) {
      this.processor.downloadImage(result.url, result.filename);
    }
  }

  downloadAll() {
    this.batchResults()
      .filter(r => r.status === 'completed' && r.url)
      .forEach((result, index) => {
        setTimeout(() => {
          this.downloadResult(result);
        }, index * 500); // Stagger downloads
      });
  }

  reset() {
    this.clearAll();
    this.batchResults.set([]);
    this.completedCount.set(0);
    this.selectedTool.set('');
    this.error.set('');
  }

  formatSize(bytes: number): string {
    return this.processor.formatFileSize(bytes);
  }
}
