import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-before-after',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="before-after-container" #container>
      <div class="image-wrapper">
        <!-- After Image (Background) -->
        <img [src]="afterImage" alt="After" class="after-image" />
        
        <!-- Before Image (Clipped) -->
        <div class="before-image-wrapper" [style.width.%]="sliderPosition">
          <img [src]="beforeImage" alt="Before" class="before-image" />
        </div>
        
        <!-- Slider Handle -->
        <div class="slider-handle" [style.left.%]="sliderPosition"
             (mousedown)="startDrag($event)"
             (touchstart)="startDrag($event)">
          <div class="slider-line"></div>
          <div class="slider-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
              <polyline points="9 18 15 12 9 6" transform="translate(6, 0)"></polyline>
            </svg>
          </div>
        </div>
        
        <!-- Labels -->
        <div class="label label-before">Before</div>
        <div class="label label-after">After</div>
      </div>
    </div>
  `,
  styleUrls: ['./before-after.component.css']
})
export class BeforeAfterComponent implements OnInit {
  @Input() beforeImage: string = '';
  @Input() afterImage: string = '';
  
  sliderPosition = 50;
  isDragging = false;

  ngOnInit() {
    document.addEventListener('mousemove', (e) => this.onDrag(e));
    document.addEventListener('mouseup', () => this.stopDrag());
    document.addEventListener('touchmove', (e) => this.onDrag(e));
    document.addEventListener('touchend', () => this.stopDrag());
  }

  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    event.preventDefault();
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;

    const container = document.querySelector('.before-after-container') as HTMLElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let clientX: number;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
    } else {
      clientX = event.touches[0].clientX;
    }

    let position = ((clientX - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));
    
    this.sliderPosition = position;
  }

  stopDrag() {
    this.isDragging = false;
  }
}
