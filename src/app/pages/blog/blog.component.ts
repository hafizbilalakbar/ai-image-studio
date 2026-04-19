import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogPosts = [
    {
      title: 'The Future of AI Image Editing in 2026',
      excerpt: 'Explore how artificial intelligence is revolutionizing the way we edit and create images.',
      date: 'April 15, 2026',
      category: 'AI Technology',
      readTime: '5 min read'
    },
    {
      title: '10 Tips for Better Product Photography',
      excerpt: 'Learn professional techniques to make your product images stand out in e-commerce.',
      date: 'April 10, 2026',
      category: 'Photography',
      readTime: '7 min read'
    },
    {
      title: 'How to Remove Backgrounds Like a Pro',
      excerpt: 'Master the art of background removal with our comprehensive guide and AI tools.',
      date: 'April 5, 2026',
      category: 'Tutorial',
      readTime: '6 min read'
    },
    {
      title: 'Restoring Old Family Photos with AI',
      excerpt: 'Bring your precious memories back to life using advanced AI restoration techniques.',
      date: 'March 28, 2026',
      category: 'Tutorial',
      readTime: '8 min read'
    }
  ];
}
