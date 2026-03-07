import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: { scrollToTop: true }
  },
  { 
    path: 'ueber-uns', 
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    data: { scrollToTop: true }
  },
  { 
    path: 'dienstleistungen', 
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    data: { scrollToTop: true }
  },
  { 
    path: 'produkte', 
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    data: { scrollToTop: true }
  },
  { 
    path: 'kontakt', 
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    data: { scrollToTop: true }
  },
  { 
    path: 'impressum', 
    loadComponent: () => import('./pages/impressum/impressum.component').then(m => m.ImpressumComponent),
    data: { scrollToTop: true }
  },
  { 
    path: 'datenschutz', 
    loadComponent: () => import('./pages/datenschutz/datenschutz.component').then(m => m.DatenschutzComponent),
    data: { scrollToTop: true }
  },
  { 
    path: 'faq', 
    loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent),
    data: { scrollToTop: true }
  },
  { 
    path: '**', 
    redirectTo: '',
    data: { scrollToTop: true }
  }
];
