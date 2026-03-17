import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PageImageComponent } from '../../components/page-image/page-image.component';

interface PriceRow {
  service: string;
  timing: string;
  price: string;
}

interface PriceGroup {
  title: string;
  summary: string;
  rows: PriceRow[];
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, PageImageComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  protected readonly priceGroups: PriceGroup[] = [
    {
      title: 'Türöffnung zugefallene Tür',
      summary: 'Schnelle Öffnung bei zugefallener Tür mit Zeitstaffelung.',
      rows: [
        { service: 'Mo-Sa', timing: '08:00-18:00', price: '89 EUR' },
        { service: 'Mo-Sa', timing: '18:00-08:00', price: '109 EUR' },
        { service: 'Sonntag & Feiertage', timing: 'ganztags', price: '129 EUR' }
      ]
    },
    {
      title: 'Türöffnung abgeschlossene Tür',
      summary: 'Für abgeschlossene Türen mit abgestufter Einsatzzeit.',
      rows: [
        { service: 'Mo-Fr', timing: '08:00-18:00', price: '119 EUR' },
        { service: 'Mo-Fr', timing: '18:00-08:00', price: '139 EUR' },
        { service: 'Sonntag & Feiertage', timing: 'ganztags', price: '159 EUR' }
      ]
    },
    {
      title: 'Zusatzleistungen',
      summary: 'Weitere Leistungen werden nach Aufwand oder nach Maß berechnet.',
      rows: [
        { service: 'Zusatzarbeitszeit', timing: 'je Stunde', price: '89 EUR' },
        { service: 'Anfahrtskosten', timing: 'Hin- & Rückfahrt ab 20 km', price: '29 EUR' },
        { service: 'Zylinderwechsel', timing: 'je nach Maße', price: '89-129 EUR zzgl. Material' },
        { service: 'Türreparatur', timing: 'je nach Schaden', price: '199-299 EUR zzgl. Material' },
        { service: 'Schlosswechsel', timing: 'je Einsatz', price: '89 EUR zzgl. Material' },
        { service: 'Beschlag wechseln', timing: 'je Einsatz', price: '89 EUR zzgl. Material' }
      ]
    }
  ];
}
