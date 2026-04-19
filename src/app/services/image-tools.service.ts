import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface ProcessResult {
  url: string;
  mock?: boolean;
  message?: string;
  results?: Array<{url: string, filename: string}>;
  count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImageToolsService {
  private http = inject(HttpClient);
  private apiBase = '/api';

  /** Generate image from text prompt (AI Designer) */
  async generateImage(prompt: string): Promise<ProcessResult> {
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/generate`, { prompt })
    );
    return res;
  }

  /** Enhance image quality */
  async enhanceImage(file: File): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/enhance`, formData)
    );
    return res;
  }

  /** Remove background */
  async removeBg(file: File): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/remove-bg`, formData)
    );
    return res;
  }

  /** Restore old photo */
  async restorePhoto(file: File): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/restore`, formData)
    );
    return res;
  }

  /** Remove watermark */
  async removeWatermark(file: File): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/watermark`, formData)
    );
    return res;
  }

  /** Colorize black & white photo */
  async colorizePhoto(file: File): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/colorize`, formData)
    );
    return res;
  }

  /** Remove object from image */
  async removeObject(file: File, mask?: string): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    if (mask) formData.append('mask', mask);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/remove-object`, formData)
    );
    return res;
  }

  /** Generate AI background */
  async generateBackground(file: File, prompt: string): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt', prompt);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/background`, formData)
    );
    return res;
  }

  /** Face cutout */
  async faceCutout(file: File): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/face-cutout`, formData)
    );
    return res;
  }

  /** ID photo maker */
  async makeIdPhoto(file: File, size: string = 'passport'): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('size', size);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/id-photo`, formData)
    );
    return res;
  }

  /** Product retouch */
  async retouchProduct(file: File): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/product`, formData)
    );
    return res;
  }

  /** White background */
  async whiteBg(file: File): Promise<ProcessResult> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/white-bg`, formData)
    );
    return res;
  }

  /** Batch processing */
  async batchProcess(tool: string, files: File[]): Promise<ProcessResult> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    const res = await firstValueFrom(
      this.http.post<ProcessResult>(`${this.apiBase}/batch/${tool}`, formData)
    );
    return res;
  }

  /** Download helper */
  downloadImage(url: string, filename: string = 'image.png') {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /** Validate image file */
  validateImageFile(file: File, maxSizeMB: number = 10): { valid: boolean; error?: string } {
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'Please upload a valid image file' };
    }

    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
    }

    return { valid: true };
  }

  /** Format file size */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
