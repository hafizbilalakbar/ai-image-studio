import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { 
    path: '', 
    renderMode: RenderMode.Server 
  },
  { 
    path: 'pricing', 
    renderMode: RenderMode.Server 
  },
  { 
    path: 'about', 
    renderMode: RenderMode.Server 
  },
  { 
    path: 'contact', 
    renderMode: RenderMode.Server 
  },
  { 
    path: 'image-generator', 
    renderMode: RenderMode.Server 
  },
  // All tool routes use Server mode (lazy loaded, no prerender)
  { 
    path: 'tools/**', 
    renderMode: RenderMode.Server 
  },
  { 
    path: '**', 
    renderMode: RenderMode.Server 
  }
];
