import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

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

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      privacy: [false, Validators.requiredTrue]
    });

    emailjs.init({
      publicKey: 'wSX5F6NjxB53pjEZ-'
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.submitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      try {
        const templateParams = {
          email: 'bsr-schluesseldienst@outlook.de',
          name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          title: this.contactForm.value.subject,
          phone: this.contactForm.value.phone,
          content: `
Neue Nachricht von ${this.contactForm.value.name}

Betreff: ${this.contactForm.value.subject}
E-Mail: ${this.contactForm.value.email}
Telefon: ${this.contactForm.value.phone || 'Nicht angegeben'}

Nachricht:
${this.contactForm.value.message}
          `.trim()
        };

        await emailjs.send('service_yy7igz9', 'template_05d45ol', templateParams);

        this.submitSuccess = true;
        this.contactForm.reset();

        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      } catch (error) {
        console.error('Error sending email:', error);
        this.submitError = true;
      } finally {
        this.submitting = false;
      }
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}
