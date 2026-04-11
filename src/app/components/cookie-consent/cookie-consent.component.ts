import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
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

  protected readonly showBanner = computed(() => !this.consentService.hasDecision());
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
  }

  protected acceptAll(): void {
    this.consentService.acceptAll();
    this.syncTracking();
  }

  protected rejectOptional(): void {
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
