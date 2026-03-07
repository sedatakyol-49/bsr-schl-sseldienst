import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EmergencyButtonComponent } from './components/emergency-button/emergency-button.component';
import { filter } from 'rxjs/operators';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    EmergencyButtonComponent
  ],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-header></app-header>
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
      <app-emergency-button></app-emergency-button>
    </div>
  `,
})
export class AppComponent {
  title = 'BSR Schlüsseldienst';
  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      this.updateSeo();
    });

    this.updateSeo();
  }

  private updateSeo() {
    let currentRoute = this.route.firstChild;

    while (currentRoute?.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const seo = currentRoute?.snapshot.data['seo'];
    const path = currentRoute?.routeConfig?.path ?? '';

    if (seo) {
      this.seoService.update(seo, path === '**' ? '' : path);
    }
  }
}
