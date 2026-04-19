import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = signal(false);
  toolsOpen = signal(false);
  scrolled = signal(false);

  // Organized tool categories for mega menu
  toolCategories = [
    {
      category: 'Enhancement',
      icon: 'sparkles',
      tools: [
        { name: 'Image Enhancement', route: '/tools/enhance', icon: 'sparkles', desc: 'Upscale & sharpen' },
        { name: 'Restore Old Photo', route: '/tools/restore', icon: 'image-plus', desc: 'Repair & restore' },
        { name: 'Colorize Photo', route: '/tools/colorize', icon: 'palette', desc: 'Add color to B&W' }
      ]
    },
    {
      category: 'Background',
      icon: 'mountain',
      tools: [
        { name: 'Remove Background', route: '/tools/remove-bg', icon: 'crop', desc: 'Transparent BG' },
        { name: 'AI Background', route: '/tools/background', icon: 'mountain', desc: 'Generate BG' },
        { name: 'White Background', route: '/tools/white-bg', icon: 'square', desc: 'Clean white BG' }
      ]
    },
    {
      category: 'Object Removal',
      icon: 'eraser',
      tools: [
        { name: 'Remove Object', route: '/tools/remove-object', icon: 'scan', desc: 'Erase objects' },
        { name: 'Watermark Remover', route: '/tools/watermark', icon: 'eraser', desc: 'Remove watermarks' }
      ]
    },
    {
      category: 'Specialized',
      icon: 'user',
      tools: [
        { name: 'Face Cutout', route: '/tools/face-cutout', icon: 'user', desc: 'Extract faces' },
        { name: 'ID Photo Maker', route: '/tools/id-photo', icon: 'credit-card', desc: 'Passport photos' },
        { name: 'Product Retouch', route: '/tools/product', icon: 'package', desc: 'E-commerce ready' }
      ]
    },
    {
      category: 'Creative',
      icon: 'palette',
      tools: [
        { name: 'AI Designer', route: '/tools/designer', icon: 'palette', desc: 'Text to image' }
      ]
    }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
    if (this.menuOpen()) this.toolsOpen.set(false);
  }

  toggleTools() {
    this.toolsOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
    this.toolsOpen.set(false);
  }

  getToolColor(route: string): string {
    const colorMap: Record<string, string> = {
      '/tools/enhance': '#10b981',
      '/tools/remove-bg': '#8b5cf6',
      '/tools/restore': '#f59e0b',
      '/tools/watermark': '#ef4444',
      '/tools/designer': '#06b6d4',
      '/tools/colorize': '#ec4899',
      '/tools/remove-object': '#14b8a6',
      '/tools/background': '#3b82f6',
      '/tools/face-cutout': '#f97316',
      '/tools/id-photo': '#6366f1',
      '/tools/product': '#84cc16',
      '/tools/white-bg': '#64748b'
    };
    return colorMap[route] || '#10b981';
  }
}
