import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected readonly channels = [
    {
      label: 'Instagram',
      href: null,
      icon: 'fab fa-instagram',
      external: false,
      available: false
    },
    {
      label: 'Facebook',
      href: null,
      icon: 'fab fa-facebook-f',
      external: false,
      available: false
    },
    {
      label: 'TikTok',
      href: null,
      icon: 'fab fa-tiktok',
      external: false,
      available: false
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/491777679185',
      icon: 'fab fa-whatsapp',
      external: true,
      available: true
    }
  ];
}
