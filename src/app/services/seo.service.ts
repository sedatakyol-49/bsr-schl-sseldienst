import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly domain = 'https://bsr-schluesseldienst.de';

  update(config: SeoConfig, path: string) {
    const normalizedPath = path ? `/${path}` : '/';
    const canonicalUrl = `${this.domain}${normalizedPath}`;

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords ?? '' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    this.updateCanonical(canonicalUrl);
    this.updateStructuredData(path, config);
  }

  private updateCanonical(url: string) {
    let link = this.document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }

    link.href = url;
  }

  private updateStructuredData(path: string, config: SeoConfig) {
    const scriptId = 'app-structured-data';
    const existing = this.document.getElementById(scriptId);
    existing?.remove();

    const structuredData = this.buildStructuredData(path, config);
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  private buildStructuredData(path: string, config: SeoConfig) {
    const baseBusiness = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'BSR Schlüsseldienst',
      url: this.domain,
      telephone: '+491777679185',
      email: 'Info@bsr-schluesseldienst.de',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hessenstraße 3',
        postalCode: '79211',
        addressLocality: 'Denzlingen',
        addressCountry: 'DE'
      },
      areaServed: [
        'Freiburg',
        'Emmendingen',
        'Ettenheim',
        'Lahr',
        'Offenburg',
        'Bad Krozingen',
        'Müllheim',
        'Neuenburg am Rhein',
        'Weil am Rhein',
        'Lörrach',
        'Rheinfelden'
      ]
    };

    if (path === 'faq') {
      return {
        '@context': 'https://schema.org',
        '@graph': [
          baseBusiness,
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Wie schnell ist BSR Schlüsseldienst vor Ort?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Je nach Standort und Verkehrslage reagieren wir für Freiburg und Südbaden schnell und regional abgestimmt.'
                }
              },
              {
                '@type': 'Question',
                name: 'Was kostet eine Türöffnung?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Die wichtigsten Preispositionen finden Sie auf unserer Preisliste. Für eine zugefallene Tür beginnt der Einsatz tagsüber bei 89 EUR.'
                }
              },
              {
                '@type': 'Question',
                name: 'Arbeitet ihr auch abends oder an Feiertagen?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ja. Für Abend-, Nacht- sowie Sonn- und Feiertagseinsätze gelten die entsprechenden Preisstaffeln aus der Preisliste.'
                }
              }
            ]
          }
        ]
      };
    }

    if (path === 'produkte') {
      return {
        '@context': 'https://schema.org',
        '@graph': [
          baseBusiness,
          {
            '@type': 'OfferCatalog',
            name: 'BSR Schlüsseldienst Preisliste',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Türöffnung zugefallene Tür (Mo-Sa 08:00-18:00)' },
                price: '89',
                priceCurrency: 'EUR'
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Türöffnung zugefallene Tür (Mo-Sa 18:00-08:00)' },
                price: '109',
                priceCurrency: 'EUR'
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Türöffnung abgeschlossene Tür (Mo-Fr 08:00-18:00)' },
                price: '119',
                priceCurrency: 'EUR'
              },
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Zusatzarbeitszeit je Stunde' },
                price: '89',
                priceCurrency: 'EUR'
              }
            ]
          }
        ]
      };
    }

    return {
      '@context': 'https://schema.org',
      '@graph': [
        baseBusiness,
        {
          '@type': 'WebPage',
          name: config.title,
          description: config.description,
          url: `${this.domain}${path ? `/${path}` : '/'}`
        }
      ]
    };
  }
}
