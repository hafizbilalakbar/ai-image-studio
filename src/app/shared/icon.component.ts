import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Simple SVG Icon Component
 * Uses inline SVGs for common icons - no external dependencies
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      [attr.width]="size" 
      [attr.height]="size" 
      [attr.viewBox]="getViewBox()"
      [class]="cssClass"
      [style.stroke]="color"
      [style.stroke-width]="strokeWidth"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <ng-container [ngSwitch]="name">
        <!-- Tool Icons -->
        <g *ngSwitchCase="'sparkles'">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 3v4M19 17v4M3 5h4M17 19h4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'crop'">
          <path d="M6 2v14a2 2 0 0 0 2 2h14" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18 22V8a2 2 0 0 0-2-2H2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'image-plus'">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          <path d="M16 8h6M19 5v6" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'eraser'">
          <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/>
          <path d="M22 21H7M5 11l9 9"/>
        </g>
        <g *ngSwitchCase="'palette'">
          <circle cx="13.5" cy="6.5" r=".5"/>
          <circle cx="17.5" cy="10.5" r=".5"/>
          <circle cx="8.5" cy="7.5" r=".5"/>
          <circle cx="6.5" cy="12.5" r=".5"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.43-.33-.78-.72-.954C12.268 19.062 11.5 18.2 11.5 17c0-1.5 1.5-3 3.5-3H18c3.3 0 6-2.7 6-6 0-3.5-2.7-6-6-6Z"/>
        </g>
        <g *ngSwitchCase="'scan'">
          <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
          <path d="M7 12h10"/>
        </g>
        <g *ngSwitchCase="'mountain'">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
        </g>
        <g *ngSwitchCase="'user'">
          <circle cx="12" cy="8" r="5"/>
          <path d="M20 21a8 8 0 0 0-16 0"/>
        </g>
        <g *ngSwitchCase="'credit-card'">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <line x1="2" x2="22" y1="10" y2="10"/>
        </g>
        <g *ngSwitchCase="'package'">
          <path d="m7.5 4.27 9 3.87 1.69 3.84M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
          <path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>
        </g>
        <g *ngSwitchCase="'square'">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
        </g>
        <g *ngSwitchCase="'layers'">
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.23 5.99c-.69.34-.69 1.32 0 1.66l8.94 4.25c.5.24 1.08.24 1.58 0l8.94-4.25c.69-.34.69-1.32 0-1.66Z"/>
          <path d="m22 12-8.94 4.25c-.5.24-1.08.24-1.58 0L2.5 12"/>
          <path d="m22 16-8.94 4.25c-.5.24-1.08.24-1.58 0L2.5 16"/>
        </g>
        
        <!-- Feature Icons -->
        <g *ngSwitchCase="'shield-check'">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6l8-4 8 4Z"/>
          <path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'target'">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </g>
        <g *ngSwitchCase="'smartphone'">
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
          <path d="M12 18h.01"/>
        </g>
        <g *ngSwitchCase="'cloud'">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        </g>
        <g *ngSwitchCase="'shield'">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6l8-4 8 4Z"/>
        </g>
        <g *ngSwitchCase="'zap'">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'award'">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
        </g>
        <g *ngSwitchCase="'globe'">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
          <path d="M2 12h20"/>
        </g>
        
        <!-- UI Icons -->
        <g *ngSwitchCase="'upload-cloud'">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
          <path d="M12 12v9M8 16l4-4 4 4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'download'">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'loader-2'">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'check-circle'">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <path d="m9 11 3 3L22 4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g *ngSwitchCase="'alert-circle'">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="8" y2="12"/>
          <line x1="12" x2="12.01" y1="16" y2="16"/>
        </g>
        <g *ngSwitchCase="'alert-triangle'">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" x2="12" y1="9" y2="13"/>
          <line x1="12" x2="12.01" y1="17" y2="17"/>
        </g>
        <g *ngSwitchCase="'wrench'">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </g>
        <g *ngSwitchCase="'gem'">
          <path d="M6 3h12l4 6-10 13L2 9Z"/>
          <path d="M11 3 8 9l4 13 4-13-3-6"/>
          <path d="M2 9h20"/>
          <path d="m10 16-2-7 4-4 4 4-2 7"/>
        </g>
        <g *ngSwitchCase="'rocket'">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </g>
        
        <!-- Navigation Icons -->
        <g *ngSwitchCase="'home'">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </g>
        <g *ngSwitchCase="'info'">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4M12 8h.01" stroke-linecap="round"/>
        </g>
        <g *ngSwitchCase="'mail'">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </g>
        <g *ngSwitchCase="'help-circle'">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke-linecap="round"/>
        </g>
        
        <!-- Social Icons -->
        <g *ngSwitchCase="'github'">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </g>
        <g *ngSwitchCase="'twitter'">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 2-2.6z"/>
        </g>
        <g *ngSwitchCase="'linkedin'">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </g>
        <g *ngSwitchCase="'youtube'">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
          <path d="m10 15 5-3-5-3z"/>
        </g>
        <g *ngSwitchCase="'instagram'">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </g>
        
        <!-- Default: chevron -->
        <g *ngSwitchDefault>
          <polyline points="6,9 12,15 18,9" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </ng-container>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class IconComponent {
  @Input() name: string = 'chevron-down';
  @Input() size: number = 24;
  @Input() color: string = 'currentColor';
  @Input() strokeWidth: number = 2;
  @Input() cssClass: string = '';

  getViewBox(): string {
    return '0 0 24 24';
  }
}
