import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerReview, ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Das sagen unsere Kunden</h2>
          <p class="text-lg text-gray-600">Erfahren Sie, was unsere Kunden über unseren Service denken.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div *ngFor="let review of reviews" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center mb-4">
              <div class="text-primary-600">
                <ng-container *ngFor="let star of [1, 2, 3, 4, 5]">
                  <i class="fas fa-star" [class.text-yellow-400]="star <= review.rating"></i>
                </ng-container>
              </div>
              <span class="ml-2 text-gray-600">{{ review.relativeDate }}</span>
            </div>

            <p class="text-gray-700 mb-4">"{{ review.comment }}"</p>

            <div class="flex items-center justify-between">
              <div>
                <p class="font-semibold">{{ review.authorName }}</p>
                <p class="text-sm text-gray-600">Google Rezension</p>
              </div>
              <div class="text-primary-600">
                <i class="fas fa-quote-right text-2xl opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ReviewsComponent implements OnInit {
  reviews: CustomerReview[] = [];

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.reviewsService.getBusinessReviews().subscribe(data => {
      this.reviews = data.reviews;
    });
  }
}
