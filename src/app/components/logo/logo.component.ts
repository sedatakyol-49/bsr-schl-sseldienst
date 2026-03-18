import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logo" title="BSR Schlüsseldienst">
      <img src="assets/brand/bsr-logo.jpeg" alt="BSR Schlüsseldienst" />
    </div>
  `,
  styles: [`
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      padding: 0.25rem 0.45rem;
      background: transparent;
    }

    img {
      display: block;
      width: auto;
      height: 52px;
      max-width: 100%;
      object-fit: contain;
      mix-blend-mode: darken;
      filter: saturate(0.9) contrast(1.02) brightness(0.98);
    }

    @media (max-width: 768px) {
      .logo {
        padding: 0.2rem 0.35rem;
      }

      img {
        height: 44px;
      }
    }
  `]
})
export class LogoComponent {}
