import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-media',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="service-media" [class.service-media-compact]="compact">
      <div *ngIf="src; else iconTemplate" class="service-image">
        <img [src]="src" [alt]="alt" />
      </div>

      <ng-template #iconTemplate>
        <div class="service-icon-wrap">
          <div class="service-icon">
            <i class="fas" [ngClass]="iconClass"></i>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .service-media {
      display: flex;
      min-height: 0;
      align-items: center;
      justify-content: flex-start;
      overflow: visible;
      padding: 0;
      background: transparent;
    }

    .service-image,
    .service-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    img {
      display: block;
      width: auto;
      max-width: 100%;
      height: auto;
      max-height: 12rem;
      object-fit: contain;
      object-position: center;
      border-radius: 0.9rem;
      box-shadow: 0 10px 24px rgba(8, 27, 72, 0.08);
    }

    .service-icon {
      display: inline-flex;
      width: 3.2rem;
      height: 3.2rem;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(20, 63, 156, 0.08);
      border-radius: 0.9rem;
      background: #eef4ff;
      color: #143f9c;
      font-size: 1rem;
      box-shadow: 0 8px 18px rgba(20, 63, 156, 0.08);
    }

    .service-media-compact {
      min-height: 0;
      padding: 0;
    }

    .service-media-compact .service-icon {
      width: 2.9rem;
      height: 2.9rem;
      border-radius: 0.8rem;
      font-size: 0.92rem;
      box-shadow: 0 6px 14px rgba(20, 63, 156, 0.08);
    }

    @media (max-width: 767px) {
      .service-media-compact {
        min-height: 0;
      }

      img {
        max-height: 9.75rem;
      }
    }
  `]
})
export class ServiceMediaComponent {
  @Input() src?: string;
  @Input() alt = '';
  @Input() iconClass = 'fa-key';
  @Input() compact = false;
}
