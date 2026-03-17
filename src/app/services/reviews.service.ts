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
  ownerResponse?: string;
  ownerResponseDate?: string;
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
    reviewCount: 5,
    reviewUrl: environment.googleReviewUrl,
    source: 'manual',
    reviews: [
      {
        id: 'manual-fabio-chiello',
        authorName: 'Fabio Chiello',
        rating: 5,
        relativeDate: 'vor 2 Tagen',
        comment: 'Ich bin äußerst zufrieden mit dem Service dieses Schlossers! Er war sehr professionell, freundlich und unglaublich schnell. Die Tür wurde ohne Probleme geöffnet, obwohl ich die Schlüssel versehentlich drinnen vergessen hatte.',
        ownerResponse: 'Vielen Dank für Ihre positive Bewertung Herr Chiello!',
        ownerResponseDate: 'vor 2 Tagen'
      },
      {
        id: 'manual-peter-voigt',
        authorName: 'Peter Voigt',
        rating: 5,
        relativeDate: 'vor 2 Tagen',
        comment: 'So sieht perfekter Service aus! Pünktlich zum Termin erschienen, schnelle, saubere Arbeit und extrem freundlich. Besten Dank!',
        ownerResponse: 'Vielen Dank für Ihre positive Bewertung Herr Voigt!',
        ownerResponseDate: 'vor einem Monat'
      },
      {
        id: 'manual-lm-z',
        authorName: 'LM Z',
        rating: 5,
        relativeDate: 'vor 3 Tagen',
        comment: 'Schnell da gewesen, schnell die Tür geöffnet und super freundlich :)',
        ownerResponse: 'Vielen Dank für Ihre positive Bewertung Frau Z!',
        ownerResponseDate: 'vor 2 Tagen'
      },
      {
        id: 'manual-maxim-malzew',
        authorName: 'Maxim Malzew',
        rating: 5,
        relativeDate: 'vor 2 Wochen',
        comment: 'Super schneller und professioneller Service! Der Schlüsseldienst war innerhalb kürzester Zeit vor Ort und hat die Tür ohne Schäden geöffnet. Sehr freundlicher Mitarbeiter, der alles transparent erklärt hat.',
        ownerResponse: 'Vielen Dank für Ihre positive Bewertung Herr Malzew!',
        ownerResponseDate: 'vor 2 Wochen'
      },
      {
        id: 'manual-bibek-thapa',
        authorName: 'bibek thapa',
        rating: 5,
        relativeDate: 'vor 2 Tagen',
        comment: 'Wir hatten uns aus unserer Wohnung ausgesperrt. Wir riefen ihn an, und der Service war schnell und hilfreich. Die Mitarbeiter waren professionell und freundlich. Ich kann sie nur empfehlen, falls Sie einen Notfall in Ihrer Wohnung haben.',
        ownerResponse: 'Vielen Dank für Ihre positive Bewertung Herr Thapa!',
        ownerResponseDate: 'vor 1 Tag'
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
