import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  stats: Stat[] = [
    { value: '10M+', label: 'Images Processed', icon: 'image' },
    { value: '500K+', label: 'Active Users', icon: 'users' },
    { value: '12', label: 'AI Tools', icon: 'wrench' },
    { value: '99.9%', label: 'Uptime', icon: 'activity' }
  ];

  features = [
    {
      icon: 'zap',
      title: 'Lightning Fast Processing',
      description: 'Our distributed AI infrastructure processes images in seconds, not minutes. Experience real-time results with our optimized pipeline.'
    },
    {
      icon: 'shield',
      title: 'Privacy & Security First',
      description: 'Your images are never stored or used for training. We implement end-to-end encryption and full GDPR compliance to protect your data.'
    },
    {
      icon: 'award',
      title: 'Professional Quality',
      description: 'State-of-the-art AI models trained on millions of images deliver studio-quality results that rival professional photo editors.'
    },
    {
      icon: 'globe',
      title: 'Accessible Anywhere',
      description: 'Works entirely in your browser on any device. No downloads, no software installation required. Create stunning visuals from anywhere.'
    },
    {
      icon: 'layers',
      title: 'Batch Processing',
      description: 'Process multiple images simultaneously with our intelligent batch workflow system. Save hours of manual editing time.'
    },
    {
      icon: 'heart',
      title: 'Built for Everyone',
      description: 'From hobbyists to enterprise teams, our intuitive interface makes professional AI tools accessible to users of all skill levels.'
    }
  ];

  teamMembers: TeamMember[] = [
    { name: 'Alex Chen', role: 'AI Research Lead', avatar: '👨‍💻' },
    { name: 'Sarah Miller', role: 'Product Designer', avatar: '👩‍🎨' },
    { name: 'David Park', role: 'ML Engineer', avatar: '👨‍🔬' },
    { name: 'Emma Wilson', role: 'UX Lead', avatar: '👩‍💼' }
  ];
}
