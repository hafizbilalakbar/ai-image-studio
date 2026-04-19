import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenaiService } from '../../services/openai.service';

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.css']
})
export class ImageGeneratorComponent {
  private openaiService = inject(OpenaiService);

  prompt = signal('');
  generatedImageUrl = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  async generateImage() {
    if (!this.prompt().trim()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.generatedImageUrl.set('');

    try {
      const url = await this.openaiService.generateImage(this.prompt());
      this.generatedImageUrl.set(url);
    } catch (err: any) {
      this.errorMessage.set(err?.message || 'An error occurred while generating the image.');
    } finally {
      this.isLoading.set(false);
    }
  }

  downloadImage() {
    const url = this.generatedImageUrl();
    if (!url) return;
    
    // In a real app we might need to proxy the download to avoid CORS
    // or open in new tab
    window.open(url, '_blank');
  }
}
