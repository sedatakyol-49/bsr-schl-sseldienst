import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export interface CustomerReview {
  id: string;
  authorName: string;
  rating: number;
  relativeDate: string;
  comment: string;
  publishTime?: string;
  profilePhotoUrl?: string;
  authorUrl?: string;
}

export interface BusinessReviews {
  businessName: string;
  rating: number;
  reviewCount: number;
  reviewUrl: string;
  source: 'google' | 'manual';
  reviews: CustomerReview[];
}

interface GoogleTextValue {
  text?: string;
}

interface GoogleAuthorAttribution {
  displayName?: string;
  uri?: string;
  photoUri?: string;
}

interface GooglePlaceReview {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: GoogleTextValue;
  originalText?: GoogleTextValue;
  authorAttribution?: GoogleAuthorAttribution;
}

interface GooglePlaceDetails {
  displayName?: GoogleTextValue;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlaceReview[];
}

interface GoogleTextSearchResponse {
  places?: Array<{ name?: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private readonly http = inject(HttpClient);

  private readonly manualReviews: BusinessReviews = {
    businessName: 'BSR Schlüsseldienst',
    rating: 5,
    reviewCount: 2,
    reviewUrl: environment.googleReviewUrl,
    source: 'manual',
    reviews: [
      {
        id: 'manual-maxim-malzew',
        authorName: 'Maxim Malzew',
        rating: 5,
        relativeDate: 'vor 5 Tagen',
        comment: 'Super schneller und professioneller Service! Der Schlüsseldienst war innerhalb kürzester Zeit vor Ort und hat die Tür ohne Schäden geöffnet. Sehr freundlicher Mitarbeiter, der alles transparent erklärt hat. Man merkt sofort, dass hier mit Erfahrung und Seriosität gearbeitet wird. Kann ich wirklich jedem weiterempfehlen, der schnell und zuverlässig Hilfe braucht. Vielen Dank nochmal!'
      }
    ]
  };

  private readonly cachedReviews$ = this.loadBusinessReviews().pipe(shareReplay(1));

  getBusinessReviews(): Observable<BusinessReviews> {
    return this.cachedReviews$;
  }

  private loadBusinessReviews(): Observable<BusinessReviews> {
    const apiKey = environment.googlePlacesApiKey.trim();

    if (!apiKey) {
      return of(this.manualReviews);
    }

    const placeResourceName = environment.googlePlaceId.trim();
    const placeName$ = placeResourceName
      ? of(placeResourceName.startsWith('places/') ? placeResourceName : `places/${placeResourceName}`)
      : this.searchPlaceResourceName(apiKey);

    return placeName$.pipe(
      switchMap(placeName => this.fetchPlaceDetails(placeName, apiKey)),
      map(place => this.mapPlaceDetails(place)),
      catchError(() => of(this.manualReviews))
    );
  }

  private searchPlaceResourceName(apiKey: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.name'
    });

    return this.http.post<GoogleTextSearchResponse>(
      'https://places.googleapis.com/v1/places:searchText',
      {
        textQuery: environment.googleBusinessQuery,
        languageCode: 'de',
        regionCode: 'DE',
        maxResultCount: 1
      },
      { headers }
    ).pipe(
      map(response => {
        const placeName = response.places?.[0]?.name;

        if (!placeName) {
          throw new Error('Google Place konnte nicht ermittelt werden.');
        }

        return placeName;
      })
    );
  }

  private fetchPlaceDetails(placeName: string, apiKey: string): Observable<GooglePlaceDetails> {
    const headers = new HttpHeaders({
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'displayName,rating,userRatingCount,googleMapsUri,reviews'
    });

    return this.http.get<GooglePlaceDetails>(
      `https://places.googleapis.com/v1/${placeName}?languageCode=de`,
      { headers }
    );
  }

  private mapPlaceDetails(place: GooglePlaceDetails): BusinessReviews {
    const reviews = (place.reviews ?? [])
      .slice(0, 6)
      .map((review, index) => ({
        id: review.name ?? `google-review-${index}`,
        authorName: review.authorAttribution?.displayName ?? 'Google-Nutzer',
        rating: review.rating ?? 5,
        relativeDate: review.relativePublishTimeDescription ?? 'Google Rezension',
        publishTime: review.publishTime,
        comment: review.originalText?.text ?? review.text?.text ?? '',
        profilePhotoUrl: review.authorAttribution?.photoUri,
        authorUrl: review.authorAttribution?.uri
      }))
      .filter(review => review.comment.trim().length > 0);

    if (!reviews.length) {
      return {
        ...this.manualReviews,
        businessName: place.displayName?.text ?? this.manualReviews.businessName,
        reviewUrl: place.googleMapsUri ?? environment.googleReviewUrl
      };
    }

    return {
      businessName: place.displayName?.text ?? 'BSR Schlüsseldienst',
      rating: place.rating ?? 0,
      reviewCount: place.userRatingCount ?? reviews.length,
      reviewUrl: place.googleMapsUri ?? environment.googleReviewUrl,
      source: 'google',
      reviews
    };
  }
}
