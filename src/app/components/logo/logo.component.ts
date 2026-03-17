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
    }

    img {
      display: block;
      width: auto;
      height: 52px;
      max-width: 100%;
      object-fit: contain;
      mix-blend-mode: multiply;
      filter: contrast(1.04) saturate(0.94);
    }

    @media (max-width: 768px) {
      img {
        height: 44px;
      }
    }
  `]
})
export class LogoComponent {}
