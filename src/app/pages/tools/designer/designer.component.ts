import { Component, signal, ElementRef, viewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/icon.component';
import { ClientImageProcessor } from '../../../services/client-image-processor.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  templateUrl: './designer.component.html',
  styleUrls: ['../tools-shared.css']
})
export class DesignerComponent {
  private processor = inject(ClientImageProcessor);
  private sessionSvc = inject(SessionService);
  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  selectedFile = signal<File | null>(null);
  previewUrl = signal('');
  resultUrl = signal('');
  isProcessing = signal(false);
  error = signal('');
  dragOver = signal(false);
  prompt = signal('');

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
    if (!this.prompt()) return;
    this.isProcessing.set(true);
    this.error.set('');
    try {
      const res = await this.processor.generateImage(this.prompt());
      this.resultUrl.set(res.url);
      
      // Save to session
      this.sessionSvc.saveProject({
        tool: 'designer',
        originalImage: '',
        resultImage: res.url,
        settings: { prompt: this.prompt() }
      });
    } catch (e: any) {
      this.error.set(e?.message || 'Failed to generate image. Please try again.');
    } finally {
      this.isProcessing.set(false);
    }
  }

  download() {
    const url = this.resultUrl();
    if (!url) return;
    this.processor.downloadImage(url, 'ai-designed-image.png');
  }

  reset() {
    this.selectedFile.set(null);
    this.previewUrl.set('');
    this.resultUrl.set('');
    this.error.set('');
    this.prompt.set('');
  }
}
