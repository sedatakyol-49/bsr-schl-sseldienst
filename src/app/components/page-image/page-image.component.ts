import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-image-shell">
      <div class="page-image-frame">
        <img [src]="src" [alt]="alt" class="page-image" />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .page-image-shell {
      display: flex;
      justify-content: center;
    }

    .page-image-frame {
      width: min(100%, 24rem);
      overflow: hidden;
      border: 1px solid rgba(217, 231, 255, 0.95);
      border-radius: 2rem;
      background: linear-gradient(180deg, #ffffff, #f8fbff);
      box-shadow: 0 18px 40px rgba(8, 27, 72, 0.08);
    }

    .page-image {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 5;
      object-fit: cover;
      object-position: center top;
    }

    @media (max-width: 767px) {
      .page-image-frame {
        width: min(100%, 18rem);
        border-radius: 1.6rem;
      }
    }
  `]
})
export class PageImageComponent {
  @Input({ required: true }) src!: string;
  @Input({ required: true }) alt!: string;
}
