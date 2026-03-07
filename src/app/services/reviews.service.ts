import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  service: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private mockReviews: Review[] = [
    {
      id: 1,
      name: "Michael Schmidt",
      rating: 5,
      date: "2025-01-15",
      comment: "Sehr schneller und professioneller Service! War innerhalb von 20 Minuten da und hat meine Tür ohne Schäden geöffnet.",
      service: "Türöffnung"
    },
    {
      id: 2,
      name: "Sandra Weber",
      rating: 5,
      date: "2025-01-10",
      comment: "Faire Preise und kompetente Beratung. Die neue Schließanlage wurde perfekt installiert.",
      service: "Schließanlage"
    },
    {
      id: 3,
      name: "Thomas Müller",
      rating: 5,
      date: "2025-01-05",
      comment: "24/7 Notdienst, der sein Versprechen hält! Nachts um 3 ausgesperrt, um 3:30 war ich wieder in meiner Wohnung.",
      service: "Notöffnung"
    },
    {
      id: 4,
      name: "Julia Bauer",
      rating: 5,
      date: "2024-12-28",
      comment: "Sehr gute Beratung zum Thema Einbruchschutz. Die neuen Sicherheitsschlösser geben ein gutes Gefühl.",
      service: "Einbruchschutz"
    }
  ];

  getReviews(): Observable<Review[]> {
    return of(this.mockReviews);
  }
}