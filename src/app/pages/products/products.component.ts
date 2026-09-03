import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  protected readonly priceGroups: PriceGroup[] = [
    {
      title: 'Türöffnung zugefallene Tür',
      summary: 'Schnelle Öffnung bei zugefallener Tür mit Zeitstaffelung.',
      rows: [
        { service: 'Tagesdienst', timing: 'Mo-Sa, 08:00-18:00', price: '89 EUR' },
        { service: 'Spätdienst', timing: 'Mo-Sa, 18:00-22:00', price: '109 EUR' },
        { service: 'Nachtdienst', timing: 'Mo-Sa, 22:00-08:00', price: '129 EUR' },
        { service: 'Ganztägig', timing: 'Sonntag & Feiertage, 00:00-24:00', price: '129 EUR' }
      ]
    },
    {
      title: 'Türöffnung abgeschlossene Tür',
      summary: 'Für abgeschlossene Türen mit abgestufter Einsatzzeit.',
      rows: [
        { service: 'Tagesdienst', timing: 'Mo-Sa, 08:00-18:00', price: '119 EUR' },
        { service: 'Spätdienst', timing: 'Mo-Sa, 18:00-22:00', price: '139 EUR' },
        { service: 'Nachtdienst', timing: 'Mo-Sa, 22:00-08:00', price: '159 EUR' },
        { service: 'Ganztägig', timing: 'Sonntag & Feiertage, 00:00-24:00', price: '159 EUR' }
      ]
    },
    {
      title: 'Kfz-Service',
      summary: 'Fahrzeugbezogene Leistungen und Ersatzschlüssel nach Angebot.',
      rows: [
        { service: 'Fahrzeugtüröffnung', timing: 'je Einsatz', price: '149 EUR' },
        { service: 'Batteriewechsel', timing: 'je Schlüssel', price: '20 EUR' },
        { service: 'Ersatzschlüssel', timing: 'individuell', price: 'mit Angebot' }
      ]
    },
    {
      title: 'Schlüsselservice und Schließanlagen',
      summary: 'Kopien, Sonderbestellungen und Arbeiten an Schließanlagen.',
      rows: [
        { service: 'Schlüsselkopien', timing: 'je nach Modell', price: '10-39 EUR' },
        { service: 'Sonderbestellungen', timing: 'individuell', price: 'mit Angebot' },
        { service: 'Einbau von Schließanlagen', timing: 'individuell', price: 'mit Angebot' },
        { service: 'Wartungsvertrag für Schließanlagen', timing: 'je Einsatz', price: '89 EUR' },
        { service: 'Aufbewahrungsservice', timing: 'individuell', price: 'mit Angebot' }
      ]
    },
    {
      title: 'Zylinder und Türreparatur',
      summary: 'Austausch und Reparatur rund um Zylinder, Schloss und Beschlag.',
      rows: [
        { service: 'Profilschließzylinder-Wechsel', timing: 'je Einsatz', price: '89 EUR zzgl. Material' },
        { service: 'Schloss- / Beschlagwechsel', timing: 'je Einsatz', price: '149 EUR zzgl. Material' },
        { service: 'Austausch Mehrfachverriegelung', timing: 'je Einsatz', price: '299 EUR zzgl. Material' }
      ]
    },
    {
      title: 'Montage und Sicherheitstechnik',
      summary: 'Montagearbeiten und elektronische Systeme nach Aufwand oder Angebot.',
      rows: [
        { service: 'Panzerriegel Montage', timing: 'je Einsatz', price: '299 EUR zzgl. Material' },
        { service: 'Zusatzkastenschloss Montage', timing: 'je Einsatz', price: '299 EUR zzgl. Material' },
        { service: 'Schutzrosette Montage', timing: 'je Einsatz', price: '199 EUR zzgl. Material' },
        { service: 'Türschließer Montage', timing: 'je Einsatz', price: '299 EUR zzgl. Material' },
        { service: 'Bolzen / Riegel Montage', timing: 'je Einsatz', price: '199 EUR zzgl. Material' },
        { service: 'Bandseitensicherung Montage', timing: 'je Einsatz', price: '199 EUR zzgl. Material' },
        { service: 'Türspion Einbau/Montage', timing: 'je Einsatz', price: '299 EUR zzgl. Material' },
        { service: 'Briefkasten Montage', timing: 'je Einsatz', price: '299 EUR zzgl. Material' },
        { service: 'Installation elektr. Schließsysteme', timing: 'individuell', price: 'mit Angebot' },
        { service: 'Zutrittskontrollsysteme', timing: 'individuell', price: 'mit Angebot' },
        { service: 'Transponder Programmierung', timing: 'individuell', price: 'mit Angebot' }
      ]
    },
    {
      title: 'Wartung elektrischer Systeme',
      summary: 'Service an elektronischen Systemen nach individueller Einschätzung.',
      rows: [
        { service: 'Instandsetzungen elektr. Systeme', timing: 'individuell', price: 'mit Angebot' },
        { service: 'Batteriewechsel bei elektr. Systemen', timing: 'individuell', price: 'mit Angebot' }
      ]
    },
    {
      title: 'Zusatzzeit und Anfahrt',
      summary: 'Zusatzarbeitszeit und Anfahrt gemäß aktueller Preisliste.',
      rows: [
        { service: 'Zusatzarbeitszeit', timing: 'je angef. Std.', price: '89 EUR' },
        { service: 'Anfahrtskosten', timing: 'ab 20 km', price: '29 EUR' }
      ]
    }
  ];
}
