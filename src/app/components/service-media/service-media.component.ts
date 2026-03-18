import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-media',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="service-media">
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
      min-height: 14.25rem;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 1.6rem 1.6rem 1rem 1rem;
      padding: 1.1rem;
      background: linear-gradient(180deg, #fbfdff, #f4f8fd);
    }

    .service-image,
    .service-icon-wrap {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
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
      width: 4.5rem;
      height: 4.5rem;
      align-items: center;
      justify-content: center;
      border-radius: 1.25rem;
      background: linear-gradient(180deg, #eef4ff, #e5eeff);
      color: #143f9c;
      font-size: 1.35rem;
      box-shadow: 0 12px 24px rgba(20, 63, 156, 0.12);
    }

    @media (max-width: 767px) {
      .service-media {
        min-height: 12.5rem;
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
}
