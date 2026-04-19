import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // ✅ Routing Import

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // ✅ Yahan Routing Provide Karein
  ]
}).catch(err => console.error(err));
