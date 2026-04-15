import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ConsentPreferences, ConsentService } from '../../services/consent.service';
import { GoogleTagService } from '../../services/google-tag.service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent {
  protected readonly consentService = inject(ConsentService);
  private readonly googleTagService = inject(GoogleTagService);
  private readonly dismissedState = signal(false);

  protected readonly showBanner = computed(() => !this.dismissedState() && !this.consentService.hasDecision());
  protected readonly showPreferences = this.consentService.isPreferencesOpen;

  protected draftPreferences: ConsentPreferences = {
    necessary: true,
    marketing: false
  };

  constructor() {
    effect(() => {
      if (this.showPreferences()) {
        this.draftPreferences = { ...this.consentService.preferences() };
      }
    });

    effect(() => {
      if (!this.consentService.hasDecision()) {
        this.dismissedState.set(false);
      }
    });
  }

  protected acceptAll(): void {
    this.dismissedState.set(true);
    this.consentService.acceptAll();
    this.syncTracking();
  }

  protected rejectOptional(): void {
    this.dismissedState.set(true);
    this.consentService.rejectOptional();
    this.syncTracking();
  }

  protected openPreferences(): void {
    this.draftPreferences = { ...this.consentService.preferences() };
    this.consentService.openPreferences();
  }

  protected closePreferences(): void {
    this.consentService.closePreferences();
  }

  protected savePreferences(): void {
    this.dismissedState.set(true);
    this.consentService.savePreferences({
      necessary: true,
      marketing: this.draftPreferences.marketing
    });
    this.syncTracking();
  }

  private syncTracking(): void {
    this.googleTagService.applyConsent();
  }
}
