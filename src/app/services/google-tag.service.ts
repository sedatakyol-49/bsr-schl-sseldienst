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
  private readonly contactFormSendTo = environment.googleAdsContactFormSendTo;
  private readonly phoneClickSendTo = environment.googleAdsPhoneClickSendTo;
  private readonly whatsAppClickSendTo = environment.googleAdsWhatsAppClickSendTo;
  private linkTrackingAttached = false;

  initialize(): void {
    if (!this.tagId || !isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.hasGtag()) {
      return;
    }

    this.updateConsentMode();
    this.attachGlobalLinkTracking();

    if (this.consentService.canTrackMarketing()) {
      this.trackPageView();
    }
  }

  enableTracking(): void {
    if (!this.tagId || !isPlatformBrowser(this.platformId) || !this.hasGtag()) {
      return;
    }

    this.updateConsentMode();

    if (this.consentService.canTrackMarketing()) {
      this.trackPageView();
    }
  }

  applyConsent(): void {
    if (!this.tagId || !isPlatformBrowser(this.platformId) || !this.hasGtag()) {
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

    if (method === 'contact_form' && this.contactFormSendTo) {
      window.gtag('event', 'conversion', {
        send_to: this.contactFormSendTo,
        value: 1,
        currency: 'EUR'
      });
    }
    const conversionSendTo =
      method === 'phone' ? this.phoneClickSendTo :
      method === 'whatsapp' ? this.whatsAppClickSendTo :
      null;

    if (conversionSendTo) {
      window.gtag('event', 'conversion', {
        send_to: conversionSendTo,
        value: 1,
        currency: 'EUR'
      });
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
    return this.consentService.canTrackMarketing()
      && isPlatformBrowser(this.platformId)
      && this.hasGtag();
  }

  private hasGtag(): boolean {
    return typeof window.gtag === 'function';
  }

  private updateConsentMode(): void {
    const marketingGranted = this.consentService.canTrackMarketing();

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
        this.trackExternalLeadClick(event, link, 'phone');
      } else if (href.startsWith('https://wa.me/') || href.startsWith('http://wa.me/')) {
        this.trackExternalLeadClick(event, link, 'whatsapp');
      }
    });

    this.linkTrackingAttached = true;
  }

  private trackExternalLeadClick(
    event: Event,
    link: HTMLAnchorElement,
    method: 'phone' | 'whatsapp'
  ): void {
    if (!this.canTrack()) {
      return;
    }

    event.preventDefault();

    const href = link.href;
    const target = link.target;
    const source = this.resolveLinkLabel(link, method);
    let navigated = false;

    const continueNavigation = () => {
      if (navigated) {
        return;
      }

      navigated = true;

      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    };

    const conversionSendTo = method === 'phone' ? this.phoneClickSendTo : this.whatsAppClickSendTo;

    if (conversionSendTo) {
      window.gtag('event', 'conversion', {
        send_to: conversionSendTo,
        value: 1,
        currency: 'EUR',
        event_callback: continueNavigation
      });
    }

    window.gtag('event', 'contact', {
      send_to: this.tagId,
      method,
      event_category: 'lead',
      event_label: source,
      transport_type: 'beacon'
    });

    window.setTimeout(continueNavigation, 700);
  }

  private resolveLinkLabel(link: HTMLAnchorElement, fallback: string): string {
    const ariaLabel = link.getAttribute('aria-label')?.trim();
    const text = link.textContent?.trim();

    return ariaLabel || text || fallback;
  }
}
