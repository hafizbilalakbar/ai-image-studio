import { Component, signal, ElementRef, viewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/icon.component';
import { ClientImageProcessor } from '../../../services/client-image-processor.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-remove-bg',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  templateUrl: './remove-bg.component.html',
  styleUrls: ['../tools-shared.css']
})
export class RemoveBgComponent {
  private processor = inject(ClientImageProcessor);
  private sessionSvc = inject(SessionService);
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  selectedFile = signal<File | null>(null);
  previewUrl = signal('');
  resultUrl = signal('');
  isProcessing = signal(false);
  error = signal('');
  dragOver = signal(false);
  

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
    if (!this.selectedFile()) return;
    this.isProcessing.set(true);
    this.error.set('');
    try {
      const res = await this.processor.removeBackground(this.selectedFile()!);
      this.resultUrl.set(res.url);
      
      // Save to session
      this.sessionSvc.saveProject({
        tool: 'remove-bg',
        originalImage: this.previewUrl(),
        resultImage: res.url,
        settings: {}
      });
    } catch (e: any) {
      this.error.set(e?.message || 'Failed to process image. Please try again.');
    } finally {
      this.isProcessing.set(false);
    }
  }

  download() {
    const url = this.resultUrl();
    if (!url) return;
    this.processor.downloadImage(url, 'remove-bg-result.png');
  }

  reset() {
    this.selectedFile.set(null);
    this.previewUrl.set('');
    this.resultUrl.set('');
    this.error.set('');
    
  }
}
