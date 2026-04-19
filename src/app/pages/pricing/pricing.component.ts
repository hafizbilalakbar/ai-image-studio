import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  badge?: string;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  plans: PricingPlan[] = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our AI tools',
      features: [
        '5 images per day',
        'Basic AI tools',
        'Standard quality output',
        'Watermarked results',
        'Email support'
      ],
      cta: 'Get Started Free'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'Best for professionals and creators',
      features: [
        'Unlimited images',
        'All 12 AI tools',
        '4K quality output',
        'No watermarks',
        'Priority processing',
        'Batch processing (up to 50)',
        'API access',
        'Priority support'
      ],
      highlight: true,
      badge: 'Most Popular',
      cta: 'Start Pro Trial'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For teams and high-volume usage',
      features: [
        'Everything in Pro',
        'Unlimited batch processing',
        'Custom AI models',
        'Dedicated server',
        'White-label solution',
        'Team collaboration',
        'Advanced analytics',
        '24/7 phone support',
        'Custom integrations'
      ],
      cta: 'Contact Sales'
    }
  ];

  faqs: FAQ[] = [
    {
      question: 'How does the AI image processing work?',
      answer: 'Our platform uses state-of-the-art deep learning models trained on millions of images. When you upload an image, our AI analyzes it and applies advanced transformations based on the tool you select. Processing typically takes 2-5 seconds for most tools.',
      category: 'General'
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support all major image formats including JPEG, PNG, WebP, and TIFF. Output is provided in PNG format for tools that support transparency, and JPEG for standard outputs.',
      category: 'General'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Free users can upload files up to 5MB. Pro users can upload files up to 25MB, and Enterprise users have a 50MB limit per image.',
      category: 'General'
    },
    {
      question: 'Are my images stored on your servers?',
      answer: 'No. Your privacy is our priority. Images are processed in real-time and immediately deleted from our servers after processing. We never store, share, or use your images for any purpose other than processing.',
      category: 'Privacy'
    },
    {
      question: 'Can I use the processed images commercially?',
      answer: 'Yes! All processed images are yours to use for any purpose, including commercial use. You retain full rights to your original images and the AI-processed results.',
      category: 'Licensing'
    },
    {
      question: 'How does batch processing work?',
      answer: 'Batch processing allows you to upload multiple images (up to 50 for Pro users, unlimited for Enterprise) and process them all at once with the same tool. This saves time and is perfect for large projects.',
      category: 'Features'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.',
      category: 'Billing'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Absolutely! You can cancel your subscription at any time with no penalties. You\'ll continue to have access to your plan features until the end of your current billing period.',
      category: 'Billing'
    }
  ];

  selectedCategory = 'All';

  get categories(): string[] {
    const cats = ['All', ...new Set(this.faqs.map(faq => faq.category))];
    return cats;
  }

  get filteredFaqs(): FAQ[] {
    if (this.selectedCategory === 'All') {
      return this.faqs;
    }
    return this.faqs.filter(faq => faq.category === this.selectedCategory);
  }
}
