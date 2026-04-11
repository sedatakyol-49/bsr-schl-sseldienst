import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';

import { environment } from '../../environments/environment';
import { ConsentService } from './consent.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleTagService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly consentService = inject(ConsentService);
  private readonly tagId = environment.googleAdsTagId;
  private readonly scriptId = 'google-tag-manager-script';

  private enabled = false;
  private linkTrackingAttached = false;

  initialize(): void {
    if (!this.tagId || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.setupTag();
    this.updateConsentMode();
    this.attachGlobalLinkTracking();

    if (this.consentService.canTrackMarketing()) {
      this.enableTracking();
    }
  }

  enableTracking(): void {
    if (!this.tagId || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.updateConsentMode();

    if (this.consentService.canTrackMarketing() && !this.enabled) {
      this.injectTagScript();
      this.enabled = true;
    }

    if (this.consentService.canTrackMarketing()) {
      this.trackPageView();
    }
  }

  applyConsent(): void {
    if (!this.tagId || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.updateConsentMode();

    if (this.consentService.canTrackMarketing()) {
      this.enableTracking();
    }
  }

  trackPageView(): void {
    if (!this.canTrack()) {
      return;
    }

    const pagePath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    window.gtag('event', 'page_view', {
      page_title: this.document.title,
      page_location: window.location.href,
      page_path: pagePath,
      send_to: this.tagId
    });
  }

  trackLead(method: 'contact_form' | 'phone' | 'whatsapp', source: string): void {
    if (!this.canTrack()) {
      return;
    }

    const eventName = method === 'contact_form' ? 'generate_lead' : 'contact';

    window.gtag('event', eventName, {
      send_to: this.tagId,
      method,
      event_category: 'lead',
      event_label: source
    });
  }

  private canTrack(): boolean {
    return this.enabled
      && this.consentService.canTrackMarketing()
      && isPlatformBrowser(this.platformId)
      && typeof window.gtag === 'function';
  }

  private injectTagScript(): void {
    if (this.document.getElementById(this.scriptId)) {
      return;
    }

    const script = this.document.createElement('script');
    script.id = this.scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.tagId}`;
    this.document.head.appendChild(script);
  }

  private setupTag(): void {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());
  }

  private updateConsentMode(): void {
    const marketingGranted = this.consentService.canTrackMarketing();

    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted',
      wait_for_update: 500
    });

    window.gtag('consent', 'update', {
      ad_storage: marketingGranted ? 'granted' : 'denied',
      ad_user_data: marketingGranted ? 'granted' : 'denied',
      ad_personalization: marketingGranted ? 'granted' : 'denied',
      analytics_storage: 'denied'
    });

    if (marketingGranted) {
      window.gtag('config', this.tagId, {
        send_page_view: false
      });
    }
  }

  private attachGlobalLinkTracking(): void {
    if (this.linkTrackingAttached) {
      return;
    }

    this.document.addEventListener('click', event => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest('a[href]');

      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      const href = link.getAttribute('href')?.trim() ?? '';

      if (href.startsWith('tel:')) {
        this.trackLead('phone', this.resolveLinkLabel(link, 'phone'));
      } else if (href.startsWith('https://wa.me/') || href.startsWith('http://wa.me/')) {
        this.trackLead('whatsapp', this.resolveLinkLabel(link, 'whatsapp'));
      }
    });

    this.linkTrackingAttached = true;
  }

  private resolveLinkLabel(link: HTMLAnchorElement, fallback: string): string {
    const ariaLabel = link.getAttribute('aria-label')?.trim();
    const text = link.textContent?.trim();

    return ariaLabel || text || fallback;
  }
}
