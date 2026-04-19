import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private http = inject(HttpClient);

  async generateImage(prompt: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ url: string }>('/api/generate', { prompt })
      );
      return response?.url || '';
    } catch (error) {
      console.error('Error generating image via API:', error);
      throw error;
    }
  }
}
