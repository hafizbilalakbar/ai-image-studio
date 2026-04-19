import { Routes } from '@angular/router';

export const routes: Routes = [
  // Core pages - eagerly loaded (minimal footprint)
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'pricing', 
    loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) 
  },
  { 
    path: 'image-generator', 
    loadComponent: () => import('./components/image-generator/image-generator.component').then(m => m.ImageGeneratorComponent) 
  },

  // AI Tools - lazy loaded (loaded only when accessed)
  { 
    path: 'tools/enhance', 
    loadComponent: () => import('./pages/tools/enhance/enhance.component').then(m => m.EnhanceComponent) 
  },
  { 
    path: 'tools/remove-bg', 
    loadComponent: () => import('./pages/tools/remove-bg/remove-bg.component').then(m => m.RemoveBgComponent) 
  },
  { 
    path: 'tools/restore', 
    loadComponent: () => import('./pages/tools/restore/restore.component').then(m => m.RestoreComponent) 
  },
  { 
    path: 'tools/watermark', 
    loadComponent: () => import('./pages/tools/watermark/watermark.component').then(m => m.WatermarkComponent) 
  },
  { 
    path: 'tools/designer', 
    loadComponent: () => import('./pages/tools/designer/designer.component').then(m => m.DesignerComponent) 
  },
  { 
    path: 'tools/colorize', 
    loadComponent: () => import('./pages/tools/colorize/colorize.component').then(m => m.ColorizeComponent) 
  },
  { 
    path: 'tools/remove-object', 
    loadComponent: () => import('./pages/tools/remove-object/remove-object.component').then(m => m.RemoveObjectComponent) 
  },
  { 
    path: 'tools/background', 
    loadComponent: () => import('./pages/tools/background/background.component').then(m => m.BackgroundComponent) 
  },
  { 
    path: 'tools/face-cutout', 
    loadComponent: () => import('./pages/tools/face-cutout/face-cutout.component').then(m => m.FaceCutoutComponent) 
  },
  { 
    path: 'tools/id-photo', 
    loadComponent: () => import('./pages/tools/id-photo/id-photo.component').then(m => m.IdPhotoComponent) 
  },
  { 
    path: 'tools/product', 
    loadComponent: () => import('./pages/tools/product/product.component').then(m => m.ProductComponent) 
  },
  { 
    path: 'tools/white-bg', 
    loadComponent: () => import('./pages/tools/white-bg/white-bg.component').then(m => m.WhiteBgComponent) 
  },
  { 
    path: 'tools/batch', 
    loadComponent: () => import('./pages/tools/batch-process/batch-process.component').then(m => m.BatchProcessComponent) 
  },

  // Legal pages
  { 
    path: 'privacy-policy', 
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) 
  },
  { 
    path: 'terms-of-service', 
    loadComponent: () => import('./pages/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent) 
  },
  { 
    path: 'cookie-policy', 
    loadComponent: () => import('./pages/cookie-policy/cookie-policy.component').then(m => m.CookiePolicyComponent) 
  },
  { 
    path: 'gdpr', 
    loadComponent: () => import('./pages/gdpr/gdpr.component').then(m => m.GdprComponent) 
  },

  // Additional pages
  { 
    path: 'blog', 
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent) 
  },
  { 
    path: 'careers', 
    loadComponent: () => import('./pages/careers/careers.component').then(m => m.CareersComponent) 
  },

  // 404 - eagerly loaded
  { 
    path: '**', 
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) 
  }
];
