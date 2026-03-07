import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logo" title="BSR Schluesseldienst">
      <svg viewBox="0 0 260 72" aria-hidden="true">
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2f68dd"></stop>
            <stop offset="100%" stop-color="#081b48"></stop>
          </linearGradient>
        </defs>

        <path d="M38 4c14 10 30 10 44 0 3-2 8 0 8 4v23c0 25-14 38-30 47-16-9-30-22-30-47V8c0-4 5-6 8-4z" fill="#d8dee9" stroke="#7e8795" stroke-width="3"></path>
        <path d="M39 12c13 8 27 8 40 0 2-1 4 0 4 3v16c0 19-10 30-24 38-14-8-24-19-24-38V15c0-3 2-4 4-3z" fill="url(#shieldGradient)"></path>
        <path d="M36 23h46l-8 8H44z" fill="rgba(255,255,255,0.14)"></path>
        <circle cx="60" cy="26" r="8.5" fill="#f7f7f7"></circle>
        <circle cx="60" cy="26" r="2.8" fill="#9aa1ae"></circle>
        <path d="M58 35h5v17h-5z" fill="#f7f7f7"></path>
        <path d="M58 44h-6v4h6zM58 50h-4v4h4z" fill="#f7f7f7"></path>

        <text x="102" y="36" class="brand">BSR</text>
        <text x="102" y="58" class="subbrand">Schluesseldienst</text>
      </svg>
    </div>
  `,
  styles: [`
    .logo {
      display: block;
      width: 220px;
      height: 64px;
    }

    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    text {
      font-family: 'Manrope', sans-serif;
    }

    .brand {
      fill: #0b2561;
      font-size: 34px;
      font-weight: 800;
      letter-spacing: 0.06em;
    }

    .subbrand {
      fill: #5f6776;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0.03em;
    }
  `]
})
export class LogoComponent {}
