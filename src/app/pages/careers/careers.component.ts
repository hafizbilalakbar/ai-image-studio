import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent {
  openPositions = [
    {
      title: 'Senior AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time'
    },
    {
      title: 'Frontend Developer (Angular)',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'San Francisco',
      type: 'Full-time'
    },
    {
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time'
    }
  ];
}
