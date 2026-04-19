import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { BeforeAfterComponent } from '../../components/before-after/before-after.component';

interface Tool {
  name: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  badge?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BeforeAfterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tools: Tool[] = [
    {
      name: 'Image Enhancement',
      description: 'Upscale and sharpen your images with AI. Increase resolution up to 4x while preserving fine details and eliminating blur.',
      icon: 'sparkles',
      route: '/tools/enhance',
      color: '#7c3aed',
      badge: 'Popular'
    },
    {
      name: 'Remove Background',
      description: 'Instantly remove backgrounds from any image with precision. Perfect for portraits, products, and creative compositions.',
      icon: 'crop',
      route: '/tools/remove-bg',
      color: '#06b6d4',
      badge: 'Popular'
    },
    {
      name: 'Restore Old Photo',
      description: 'Bring old, damaged, and faded photographs back to life. AI repairs scratches, tears, and restores lost colors.',
      icon: 'image-plus',
      route: '/tools/restore',
      color: '#f59e0b'
    },
    {
      name: 'Watermark Remover',
      description: 'Cleanly remove watermarks, text overlays, and logos from images using intelligent inpainting technology.',
      icon: 'eraser',
      route: '/tools/watermark',
      color: '#ef4444'
    },
    {
      name: 'AI Designer',
      description: 'Generate stunning images from text prompts. Your creative partner for art, illustrations, and imaginative visuals.',
      icon: 'palette',
      route: '/tools/designer',
      color: '#a855f7',
      badge: 'New'
    },
    {
      name: 'Colorize Photo',
      description: 'Transform black & white photos into vivid color. AI analyzes content to apply historically accurate, natural colors.',
      icon: 'palette',
      route: '/tools/colorize',
      color: '#10b981'
    },
    {
      name: 'Remove Object',
      description: 'Select and erase any unwanted object from your photos. AI seamlessly fills the area with matching background content.',
      icon: 'scan',
      route: '/tools/remove-object',
      color: '#ec4899'
    },
    {
      name: 'AI Background',
      description: 'Replace or generate stunning backgrounds for your images. Choose from artistic scenes, gradients, or custom AI creations.',
      icon: 'mountain',
      route: '/tools/background',
      color: '#06b6d4'
    },
    {
      name: 'AI Face Cutout',
      description: 'Automatically detect and isolate faces from photos with high precision. Perfect for profile pictures and portrait editing.',
      icon: 'user',
      route: '/tools/face-cutout',
      color: '#8b5cf6'
    },
    {
      name: 'ID Photo Maker',
      description: 'Create professional passport, visa, and ID photos in seconds. Automatic sizing for all international ID photo standards.',
      icon: 'credit-card',
      route: '/tools/id-photo',
      color: '#0ea5e9',
      badge: 'New'
    },
    {
      name: 'Product Retouch',
      description: 'Enhance product photos for e-commerce. Remove blemishes, correct colors, and make your products look their best.',
      icon: 'package',
      route: '/tools/product',
      color: '#f59e0b'
    },
    {
      name: 'White Background',
      description: 'Get e-commerce ready product images with clean white backgrounds. Optimized for Amazon, Shopify, and all major platforms.',
      icon: 'square',
      route: '/tools/white-bg',
      color: '#64748b'
    }
  ];

  stats = [
    { value: '10M+', label: 'Images Processed' },
    { value: '500K+', label: 'Active Users' },
    { value: '12', label: 'AI Tools' },
    { value: '99.9%', label: 'Uptime' }
  ];

  features = [
    { icon: 'zap', title: 'Lightning Fast', desc: 'Process images in seconds, not minutes. Our distributed AI infrastructure handles millions of requests.' },
    { icon: 'shield', title: 'Privacy First', desc: 'Your images are never stored or used for training. Full data privacy and GDPR compliance guaranteed.' },
    { icon: 'award', title: 'Professional Quality', desc: 'State-of-the-art AI models trained on millions of images deliver studio-quality results every time.' },
    { icon: 'layers', title: 'Batch Processing', desc: 'Process multiple images simultaneously. Save hours with our intelligent batch workflow system.' },
    { icon: 'smartphone', title: 'Any Device', desc: 'Fully responsive across desktop, tablet, and mobile. Create stunning visuals from anywhere.' },
    { icon: 'globe', title: 'No Install Required', desc: 'Works entirely in your browser. No downloads, no software installation, just instant results.' }
  ];

  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Photographer',
      avatar: '👩‍🎨',
      rating: 5,
      text: 'AI Image Studio has completely transformed my workflow. The background removal tool is incredibly accurate and saves me hours of editing time.'
    },
    {
      name: 'Michael Chen',
      role: 'E-commerce Owner',
      avatar: '👨‍💼',
      rating: 5,
      text: 'The product retouching tools are amazing. My product photos look professional without hiring expensive photographers. Highly recommended!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Social Media Manager',
      avatar: '👩‍💻',
      rating: 5,
      text: 'I use AI Image Studio daily for creating social media content. The AI Designer is incredibly creative and the results are always stunning.'
    },
    {
      name: 'David Thompson',
      role: 'Graphic Designer',
      avatar: '👨‍🎨',
      rating: 5,
      text: 'As a professional designer, I\'m impressed by the quality. The restoration tool brought old family photos back to life beautifully.'
    }
  ];

  beforeAfterExamples = [
    {
      tool: 'Background Removal',
      before: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea"/>
            <stop offset="100%" style="stop-color:#764ba2"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg1)"/>
        <circle cx="400" cy="200" r="80" fill="#f0f0f0" opacity="0.9"/>
        <rect x="320" y="280" width="160" height="120" rx="10" fill="#f0f0f0" opacity="0.9"/>
        <text x="400" y="450" font-family="Arial" font-size="28" fill="white" text-anchor="middle" font-weight="bold">Original Image with Background</text>
      </svg>`),
      after: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
        <defs>
          <pattern id="checkerboard" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#e0e0e0"/>
            <rect x="20" y="20" width="20" height="20" fill="#e0e0e0"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#checkerboard)"/>
        <circle cx="400" cy="200" r="80" fill="#10b981" opacity="0.9"/>
        <rect x="320" y="280" width="160" height="120" rx="10" fill="#10b981" opacity="0.9"/>
        <text x="400" y="450" font-family="Arial" font-size="28" fill="#10b981" text-anchor="middle" font-weight="bold">Background Removed - Transparent</text>
      </svg>`)
    },
    {
      tool: 'Image Enhancement',
      before: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
        <rect width="100%" height="100%" fill="#4a5568"/>
        <circle cx="400" cy="180" r="90" fill="#718096" opacity="0.6"/>
        <rect x="280" y="280" width="240" height="140" rx="15" fill="#718096" opacity="0.6"/>
        <text x="400" y="460" font-family="Arial" font-size="28" fill="#a0aec0" text-anchor="middle" font-weight="bold">Low Quality - Blurry Image</text>
      </svg>`),
      after: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
        <defs>
          <linearGradient id="enhance" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#10b981"/>
            <stop offset="100%" style="stop-color:#06b6d4"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#enhance)"/>
        <circle cx="400" cy="180" r="90" fill="white" opacity="0.95"/>
        <rect x="280" y="280" width="240" height="140" rx="15" fill="white" opacity="0.95"/>
        <text x="400" y="460" font-family="Arial" font-size="28" fill="white" text-anchor="middle" font-weight="bold">4K Enhanced - Crystal Clear</text>
      </svg>`)
    },
    {
      tool: 'Photo Restoration',
      before: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
        <rect width="100%" height="100%" fill="#8b7355"/>
        <circle cx="400" cy="180" r="85" fill="#a0896b" opacity="0.7"/>
        <rect x="290" y="280" width="220" height="130" rx="12" fill="#a0896b" opacity="0.7"/>
        <line x1="350" y1="150" x2="450" y2="220" stroke="#6b5a45" stroke-width="3" opacity="0.8"/>
        <line x1="380" y1="300" x2="420" y2="380" stroke="#6b5a45" stroke-width="2" opacity="0.6"/>
        <text x="400" y="460" font-family="Arial" font-size="28" fill="#d4c4b0" text-anchor="middle" font-weight="bold">Old Damaged Photo</text>
      </svg>`),
      after: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
        <defs>
          <linearGradient id="restore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f093fb"/>
            <stop offset="100%" style="stop-color:#f5576c"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#restore)"/>
        <circle cx="400" cy="180" r="85" fill="white" opacity="0.95"/>
        <rect x="290" y="280" width="220" height="130" rx="12" fill="white" opacity="0.95"/>
        <text x="400" y="460" font-family="Arial" font-size="28" fill="white" text-anchor="middle" font-weight="bold">Restored &amp; Repaired</text>
      </svg>`)
    }
  ];
}
