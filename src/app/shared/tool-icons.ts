/**
 * Icon mapping for all tools and features
 * Using Lucide Icons - https://lucide.dev/icons/
 */

export const toolIcons: Record<string, string> = {
  // Tool icons
  'enhance': 'sparkles',
  'remove-bg': 'crop',
  'restore': 'image-plus',
  'watermark': 'eraser',
  'designer': 'palette',
  'colorize': 'palette',
  'remove-object': 'scan',
  'background': 'mountain',
  'face-cutout': 'user',
  'id-photo': 'credit-card',
  'product': 'package',
  'white-bg': 'square',
  'batch': 'layers',
  
  // Feature icons
  'privacy': 'shield-check',
  'quality': 'target',
  'batch-processing': 'layers',
  'device': 'smartphone',
  'no-install': 'cloud',
  
  // UI icons
  'upload': 'upload-cloud',
  'download': 'download',
  'processing': 'loader-2',
  'success': 'check-circle',
  'error': 'alert-circle',
  'warning': 'alert-triangle',
  
  // Navigation icons
  'home': 'home',
  'pricing': 'credit-card',
  'about': 'info',
  'contact': 'mail',
  'faq': 'help-circle',
  
  // Social icons
  'github': 'github',
  'twitter': 'twitter',
  'linkedin': 'linkedin',
  'youtube': 'youtube',
  'instagram': 'instagram'
};

/**
 * Tool configuration with icons and routes
 */
export interface ToolConfig {
  id: string;
  name: string;
  route: string;
  icon: string;
  description: string;
  color: string;
  badge?: string;
}

export const allTools: ToolConfig[] = [
  {
    id: 'enhance',
    name: 'Image Enhancement',
    route: '/tools/enhance',
    icon: 'sparkles',
    description: 'Upscale and sharpen images with AI. Increase resolution up to 4x while preserving details.',
    color: '#10b981',
    badge: 'Popular'
  },
  {
    id: 'remove-bg',
    name: 'Remove Background',
    route: '/tools/remove-bg',
    icon: 'crop',
    description: 'Instantly remove backgrounds from any image with pixel-perfect precision.',
    color: '#8b5cf6',
    badge: 'Popular'
  },
  {
    id: 'restore',
    name: 'Restore Old Photo',
    route: '/tools/restore',
    icon: 'image-plus',
    description: 'Bring old photos back to life.修复 damage, enhance clarity, and restore colors.',
    color: '#f59e0b'
  },
  {
    id: 'watermark',
    name: 'Watermark Remover',
    route: '/tools/watermark',
    icon: 'eraser',
    description: 'Remove unwanted watermarks and logos from images seamlessly.',
    color: '#ef4444'
  },
  {
    id: 'designer',
    name: 'AI Designer',
    route: '/tools/designer',
    icon: 'palette',
    description: 'Generate stunning images from text descriptions using advanced AI.',
    color: '#06b6d4',
    badge: 'New'
  },
  {
    id: 'colorize',
    name: 'Colorize Photo',
    route: '/tools/colorize',
    icon: 'palette',
    description: 'Add vibrant colors to black and white photos automatically.',
    color: '#ec4899'
  },
  {
    id: 'remove-object',
    name: 'Remove Object',
    route: '/tools/remove-object',
    icon: 'scan',
    description: 'Remove unwanted objects, people, or text from images cleanly.',
    color: '#14b8a6'
  },
  {
    id: 'background',
    name: 'AI Background',
    route: '/tools/background',
    icon: 'mountain',
    description: 'Generate custom AI backgrounds for your product or portrait photos.',
    color: '#3b82f6'
  },
  {
    id: 'face-cutout',
    name: 'Face Cutout',
    route: '/tools/face-cutout',
    icon: 'user',
    description: 'Extract faces from photos with perfect edge detection.',
    color: '#f97316'
  },
  {
    id: 'id-photo',
    name: 'ID Photo Maker',
    route: '/tools/id-photo',
    icon: 'credit-card',
    description: 'Create passport and ID photos that meet official requirements.',
    color: '#6366f1'
  },
  {
    id: 'product',
    name: 'Product Retouch',
    route: '/tools/product',
    icon: 'package',
    description: 'Professional product photo editing and enhancement for e-commerce.',
    color: '#84cc16'
  },
  {
    id: 'white-bg',
    name: 'White Background',
    route: '/tools/white-bg',
    icon: 'square',
    description: 'Replace any background with clean white for professional product shots.',
    color: '#64748b'
  }
];

/**
 * Tool categories for mega menu
 */
export const toolCategories = [
  {
    category: 'Enhancement',
    tools: ['enhance', 'restore', 'colorize']
  },
  {
    category: 'Background',
    tools: ['remove-bg', 'background', 'white-bg']
  },
  {
    category: 'Object Removal',
    tools: ['remove-object', 'watermark']
  },
  {
    category: 'Specialized',
    tools: ['face-cutout', 'id-photo', 'product']
  },
  {
    category: 'Creative',
    tools: ['designer']
  }
];
