import { Component, input, signal, ElementRef, viewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-compare',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="compare-container" #compareContainer>
      <div class="compare-wrapper" (mousemove)="onMouseMove($event)" (touchmove)="onTouchMove($event)">
        <!-- After Image (Background) -->
        <div class="compare-image compare-after">
          <img [src]="afterImage()" [alt]="afterLabel()" class="compare-img">
          <div class="compare-label compare-label-after">{{ afterLabel() }}</div>
        </div>

        <!-- Before Image (Foreground with clip) -->
        <div class="compare-image compare-before" [style.clip-path]="'inset(0 ' + (100 - sliderPosition()) + '% 0 0)'">
          <img [src]="beforeImage()" [alt]="beforeLabel()" class="compare-img">
          <div class="compare-label compare-label-before">{{ beforeLabel() }}</div>
        </div>

        <!-- Slider Handle -->
        <div class="compare-slider" [style.left.%]="sliderPosition()">
          <div class="slider-line"></div>
          <div class="slider-handle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
              <polyline points="9 18 15 12 9 6" transform="translate(6, 0)"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="compare-controls">
        <button class="control-btn" (click)="resetSlider()" title="Reset">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
        </button>
        <button class="control-btn" (click)="toggleLabels()" title="Toggle Labels">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .compare-container {
      position: relative;
      width: 100%;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background: var(--bg-card);
      border: 1px solid var(--surface-border);
    }

    .compare-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      cursor: col-resize;
      user-select: none;
    }

    .compare-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .compare-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: var(--bg-secondary);
    }

    .compare-label {
      position: absolute;
      top: 16px;
      padding: 8px 16px;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      color: white;
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: var(--radius-full);
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .compare-label-before {
      left: 16px;
    }

    .compare-label-after {
      right: 16px;
    }

    .compare-slider {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      background: white;
      transform: translateX(-50%);
      z-index: 10;
      pointer-events: none;
    }

    .slider-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      background: white;
      transform: translateX(-50%);
    }

    .slider-handle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      pointer-events: auto;
      cursor: col-resize;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .slider-handle:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }

    .compare-controls {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: flex;
      gap: 8px;
      z-index: 10;
    }

    .control-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .control-btn:hover {
      background: var(--primary);
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      .compare-wrapper {
        aspect-ratio: 4 / 3;
      }

      .slider-handle {
        width: 40px;
        height: 40px;
      }

      .compare-label {
        font-size: 0.75rem;
        padding: 6px 12px;
      }
    }
  `]
})
export class ImageCompareComponent {
  beforeImage = input.required<string>();
  afterImage = input.required<string>();
  beforeLabel = input('Before');
  afterLabel = input('After');

  sliderPosition = signal(50);
  showLabels = signal(true);

  private containerRef = viewChild<ElementRef>('compareContainer');
  private isDragging = false;

  @HostListener('mousedown')
  onMouseDown() {
    this.isDragging = true;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  @HostListener('touchstart')
  onTouchStart() {
    this.isDragging = true;
  }

  @HostListener('document:touchend')
  onTouchEnd() {
    this.isDragging = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging && event.buttons !== 1) return;
    this.updateSliderPosition(event.clientX);
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const touch = event.touches[0];
    this.updateSliderPosition(touch.clientX);
  }

  private updateSliderPosition(clientX: number) {
    const container = this.containerRef()?.nativeElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    this.sliderPosition.set(Math.max(0, Math.min(100, percentage)));
  }

  resetSlider() {
    this.sliderPosition.set(50);
  }

  toggleLabels() {
    this.showLabels.update(v => !v);
  }
}
