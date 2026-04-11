import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ConsentPreferences {
  necessary: true;
  marketing: boolean;
}

interface StoredConsentPreferences {
  version: number;
  preferences: ConsentPreferences;
}

const CONSENT_STORAGE_VERSION = 1;

@Injectable({
  providedIn: 'root'
})
export class ConsentService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'bsr-consent-preferences';
  private readonly preferencesState = signal<ConsentPreferences>({
    necessary: true,
    marketing: false
  });
  private readonly decisionMadeState = signal(false);
  private readonly preferencesOpenState = signal(false);

  readonly preferences = this.preferencesState.asReadonly();
  readonly hasDecision = this.decisionMadeState.asReadonly();
  readonly isPreferencesOpen = this.preferencesOpenState.asReadonly();

  constructor() {
    this.restoreStoredPreferences();
  }

  canTrackMarketing(): boolean {
    return this.preferencesState().marketing;
  }

  acceptAll(): void {
    this.savePreferences({
      necessary: true,
      marketing: true
    });
  }

  rejectOptional(): void {
    this.savePreferences({
      necessary: true,
      marketing: false
    });
  }

  savePreferences(preferences: ConsentPreferences): void {
    this.preferencesState.set({
      necessary: true,
      marketing: preferences.marketing
    });
    this.decisionMadeState.set(true);
    this.preferencesOpenState.set(false);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const payload: StoredConsentPreferences = {
      version: CONSENT_STORAGE_VERSION,
      preferences: this.preferencesState()
    };

    window.localStorage.setItem(this.storageKey, JSON.stringify(payload));
  }

  openPreferences(): void {
    this.preferencesOpenState.set(true);
  }

  closePreferences(): void {
    this.preferencesOpenState.set(false);
  }

  private restoreStoredPreferences(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const storedValue = window.localStorage.getItem(this.storageKey);

    if (!storedValue) {
      return;
    }

    try {
      const parsed = JSON.parse(storedValue) as Partial<StoredConsentPreferences>;
      const marketing = parsed.preferences?.marketing === true;
      const version = parsed.version;

      if (version !== CONSENT_STORAGE_VERSION) {
        return;
      }

      this.preferencesState.set({
        necessary: true,
        marketing
      });
      this.decisionMadeState.set(true);
    } catch {
      window.localStorage.removeItem(this.storageKey);
    }
  }
}
