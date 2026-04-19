import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/icon.component';

interface ContactInfo {
  icon: string;
  title: string;
  details: string;
  link?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  submitted = false;
  successMessage = '';

  contactInfo: ContactInfo[] = [
    {
      icon: 'mail',
      title: 'Email Support',
      details: 'support&#64;aiimagestudio.com',
      link: 'mailto:support&#64;aiimagestudio.com'
    },
    {
      icon: 'clock',
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM (EST)'
    },
    {
      icon: 'map-pin',
      title: 'Location',
      details: 'San Francisco, CA, USA'
    },
    {
      icon: 'message-circle',
      title: 'Live Chat',
      details: 'Available 24/7 for premium users'
    }
  ];

  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      // Simulate API call
      setTimeout(() => {
        this.successMessage = 'Thank you for reaching out! We will get back to you within 24 hours.';
        this.contactForm.reset();
        this.submitted = false;
      }, 1500);
    }
  }
}
