import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-gdpr',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css']
})
export class GdprComponent {
  lastUpdated = 'April 19, 2026';
}
