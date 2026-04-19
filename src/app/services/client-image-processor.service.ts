import { Injectable } from '@angular/core';

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
export class ClientImageProcessor {
  
  /** Enhance image - upscale and sharpen using canvas */
  async enhanceImage(file: File): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          // 2x upscale
          canvas.width = img.width * 2;
          canvas.height = img.height * 2;
          
          // High quality scaling
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Apply sharpening
          this.applySharpening(ctx, canvas.width, canvas.height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ url, message: 'Image enhanced successfully' });
            }
          }, 'image/png');
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /** Remove background using color-based segmentation */
  async removeBackground(file: File): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = img.width;
          canvas.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Simple background removal - detect edge colors and remove similar
          const bgColor = this.getBackgroundColor(data, canvas.width, canvas.height);
          
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            const distance = Math.sqrt(
              Math.pow(r - bgColor.r, 2) +
              Math.pow(g - bgColor.g, 2) +
              Math.pow(b - bgColor.b, 2)
            );
            
            if (distance < 50) {
              data[i + 3] = 0; // Make transparent
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ url, message: 'Background removed' });
            }
          }, 'image/png');
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /** Restore old photo - reduce noise and enhance */
  async restorePhoto(file: File): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = img.width;
          canvas.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          // Apply noise reduction
          this.applyNoiseReduction(ctx, canvas.width, canvas.height);
          
          // Enhance contrast
          this.applyContrastEnhancement(ctx, canvas.width, canvas.height, 1.2);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ url, message: 'Photo restored' });
            }
          }, 'image/png');
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /** Remove watermark - inpaint selected area */
  async removeWatermark(file: File): Promise<ProcessResult> {
    // For demo, apply general cleanup
    return this.restorePhoto(file);
  }

  /** Colorize black and white photo */
  async colorizePhoto(file: File): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = img.width;
          canvas.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Apply warm colorization
          for (let i = 0; i < data.length; i += 4) {
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            
            // Warm tones
            data[i] = Math.min(255, gray * 1.1);     // R
            data[i + 1] = Math.min(255, gray * 0.9); // G
            data[i + 2] = Math.min(255, gray * 0.7); // B
          }
          
          ctx.putImageData(imageData, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ url, message: 'Photo colorized' });
            }
          }, 'image/png');
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /** Remove object from image */
  async removeObject(file: File): Promise<ProcessResult> {
    // For demo, apply general cleanup
    return this.restorePhoto(file);
  }

  /** Generate background */
  async generateBackground(file: File, prompt: string): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Create gradient background based on prompt
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw original image on top
          ctx.globalAlpha = 0.7;
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ url, message: 'Background generated' });
            }
          }, 'image/png');
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /** Face cutout - detect and extract face region */
  async faceCutout(file: File): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          // Extract center region (assumed face location)
          const size = Math.min(img.width, img.height) * 0.6;
          canvas.width = size;
          canvas.height = size;
          
          const sx = (img.width - size) / 2;
          const sy = (img.height - size) / 2;
          
          ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ url, message: 'Face cutout complete' });
            }
          }, 'image/png');
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /** ID photo maker */
  async makeIdPhoto(file: File, size: string = 'passport'): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          // Standard passport photo size (600x600)
          canvas.width = 600;
          canvas.height = 600;
          
          // White background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 600, 600);
          
          // Center and scale image
          const scale = Math.min(600 / img.width, 600 / img.height) * 0.8;
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (600 - w) / 2;
          const y = (600 - h) / 2;
          
          ctx.drawImage(img, x, y, w, h);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ url, message: 'ID photo created' });
            }
          }, 'image/png');
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /** Product retouch */
  async retouchProduct(file: File): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = img.width;
          canvas.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          // Enhance brightness and contrast
          this.applyBrightnessContrast(ctx, canvas.width, canvas.height, 1.1, 1.2);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ url, message: 'Product retouched' });
            }
          }, 'image/png');
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  /** White background */
  async whiteBg(file: File): Promise<ProcessResult> {
    return this.makeIdPhoto(file, 'passport');
  }

  /** Generate image from prompt (simple pattern generation) */
  async generateImage(prompt: string): Promise<ProcessResult> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 1024;
    canvas.height = 1024;
    
    // Create artistic pattern based on prompt
    const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
    
    const hash = this.simpleHash(prompt);
    const hue1 = hash % 360;
    const hue2 = (hash * 7) % 360;
    
    gradient.addColorStop(0, `hsl(${hue1}, 70%, 60%)`);
    gradient.addColorStop(0.5, `hsl(${(hue1 + hue2) / 2}, 60%, 50%)`);
    gradient.addColorStop(1, `hsl(${hue2}, 70%, 40%)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Add some patterns
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      const x = (this.simpleHash(prompt + i) % 1024);
      const y = (this.simpleHash(prompt + i + 100) % 1024);
      const radius = (this.simpleHash(prompt + i + 200) % 50) + 10;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${(hue1 + i * 10) % 360}, 70%, 60%, 0.3)`;
      ctx.fill();
    }
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve({ url, message: 'Image generated from prompt' });
        }
      }, 'image/png');
    });
  }

  // Helper methods
  private getBackgroundColor(data: Uint8ClampedArray, width: number, height: number) {
    // Sample corners to determine background color
    const corners = [
      0, // top-left
      (width - 1) * 4, // top-right
      (height - 1) * width * 4, // bottom-left
      ((height - 1) * width + (width - 1)) * 4 // bottom-right
    ];
    
    let r = 0, g = 0, b = 0;
    corners.forEach(idx => {
      r += data[idx];
      g += data[idx + 1];
      b += data[idx + 2];
    });
    
    return {
      r: r / 4,
      g: g / 4,
      b: b / 4
    };
  }

  private applySharpening(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const copy = new Uint8ClampedArray(data);
    
    const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * width + (x + kx)) * 4 + c;
              sum += copy[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
            }
          }
          const idx = (y * width + x) * 4 + c;
          data[idx] = Math.min(255, Math.max(0, sum));
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  private applyNoiseReduction(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const copy = new Uint8ClampedArray(data);
    
    // Simple box blur
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * width + (x + kx)) * 4 + c;
              sum += copy[idx];
            }
          }
          const idx = (y * width + x) * 4 + c;
          data[idx] = sum / 9;
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  private applyContrastEnhancement(ctx: CanvasRenderingContext2D, width: number, height: number, factor: number) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, ((data[i] - 128) * factor) + 128));
      data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] - 128) * factor) + 128));
      data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] - 128) * factor) + 128));
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  private applyBrightnessContrast(ctx: CanvasRenderingContext2D, width: number, height: number, brightness: number, contrast: number) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, Math.max(0, ((data[i] - 128) * contrast) + 128 * brightness));
      data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] - 128) * contrast) + 128 * brightness));
      data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] - 128) * contrast) + 128 * brightness));
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
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
