import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      scrollToTop: true,
      seo: {
        title: 'BSR Schlüsseldienst | Schlüssel, Schlösser und Sicherheit in Freiburg und Südbaden',
        description: 'BSR Schlüsseldienst bietet schnelle Hilfe rund um Schlüssel, Schlösser und Sicherheit in Freiburg, Denzlingen und der Region Südbaden.',
        keywords: 'BSR Schlüsseldienst, Schlüsseldienst Freiburg, Schlüsselnotdienst Freiburg, Schlosswechsel, Sicherheit Südbaden'
      }
    }
  },
  {
    path: 'ueber-uns',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    data: {
      scrollToTop: true,
      seo: {
        title: 'Über uns | BSR Schlüsseldienst',
        description: 'Erfahren Sie mehr über BSR Schlüsseldienst, unseren regionalen Einsatz in Südbaden und unsere Arbeitsweise.',
        keywords: 'über BSR Schlüsseldienst, Schlüsseldienst Denzlingen, regionaler Schlüsseldienst'
      }
    }
  },
  {
    path: 'dienstleistungen',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    data: {
      scrollToTop: true,
      seo: {
        title: 'Leistungen | BSR Schlüsseldienst',
        description: 'Türöffnungen, Schlosswechsel, Zylinderwechsel und Reparaturen an Türen und Beschlägen für Freiburg und Südbaden.',
        keywords: 'Leistungen Schlüsseldienst, Türöffnung, Zylinderwechsel, Schlosswechsel Freiburg'
      }
    }
  },
  {
    path: 'produkte',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    data: {
      scrollToTop: true,
      seo: {
        title: 'Preisliste | BSR Schlüsseldienst',
        description: 'Transparente Preisliste von BSR Schlüsseldienst für Türöffnungen, Zusatzzeiten, Zylinderwechsel und Reparaturen.',
        keywords: 'Preisliste Schlüsseldienst, Türöffnung Preise, Schlüsseldienst Kosten Freiburg'
      }
    }
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    data: {
      scrollToTop: true,
      seo: {
        title: 'Kontakt | BSR Schlüsseldienst',
        description: 'Kontaktieren Sie BSR Schlüsseldienst telefonisch, per WhatsApp oder über das Kontaktformular.',
        keywords: 'Kontakt BSR Schlüsseldienst, Schlüsseldienst Telefonnummer, WhatsApp Schlüsseldienst'
      }
    }
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/impressum/impressum.component').then(m => m.ImpressumComponent),
    data: {
      scrollToTop: true,
      seo: {
        title: 'Impressum | BSR Schlüsseldienst',
        description: 'Impressum und Anbieterkennzeichnung von BSR Schlüsseldienst.',
        keywords: 'Impressum BSR Schlüsseldienst'
      }
    }
  },
  {
    path: 'datenschutz',
    loadComponent: () => import('./pages/datenschutz/datenschutz.component').then(m => m.DatenschutzComponent),
    data: {
      scrollToTop: true,
      seo: {
        title: 'Datenschutz | BSR Schlüsseldienst',
        description: 'Datenschutzerklärung von BSR Schlüsseldienst für Website, Kontaktformular und externe Inhalte.',
        keywords: 'Datenschutz BSR Schlüsseldienst'
      }
    }
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent),
    data: {
      scrollToTop: true,
      seo: {
        title: 'FAQ | BSR Schlüsseldienst',
        description: 'Antworten auf häufige Fragen zu Preisen, Einsatzgebiet und Leistungen von BSR Schlüsseldienst.',
        keywords: 'FAQ Schlüsseldienst, Fragen Türöffnung, Schlüsseldienst Antworten'
      }
    }
  },
  {
    path: '**',
    redirectTo: '',
    data: { scrollToTop: true }
  }
];
