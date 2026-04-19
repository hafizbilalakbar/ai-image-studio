import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // ✅ RouterModule Import
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Standalone Component
  imports: [RouterOutlet, HeaderComponent, FooterComponent], // ✅ Required imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ai-image-studio';
}
