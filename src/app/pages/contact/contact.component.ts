import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

interface ContactResponse {
  success: boolean;
  message?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      website: [''],
      privacy: [false, Validators.requiredTrue]
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.contactForm.valid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      const payload = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        website: this.contactForm.value.website
      };

      await firstValueFrom(
        this.http.post<ContactResponse>('contact.php', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      );

      this.submitSuccess = true;
      this.contactForm.reset({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website: '',
        privacy: false
      });
      setTimeout(() => { this.submitSuccess = false; }, 5000);
    } catch (error) {
      console.error('Error sending contact form:', error);
      this.submitError = true;
    } finally {
      this.submitting = false;
    }
  }
}
