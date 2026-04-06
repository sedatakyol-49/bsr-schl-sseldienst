import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AboutInfoCard {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  protected readonly infoCards: AboutInfoCard[] = [
    {
      title: 'Standort',
      description: 'BSR Schlüsseldienst sitzt in Denzlingen und betreut Einsätze in Freiburg und weiten Teilen Südbadens.',
      icon: 'fa-location-dot'
    },
    {
      title: 'Arbeitsweise',
      description: 'Wir setzen auf klare Absprachen, saubere Ausführung und Lösungen, die zum Objekt und zur Situation passen.',
      icon: 'fa-shield-halved'
    },
    {
      title: 'Kontakt',
      description: 'Telefonisch direkt erreichbar unter 01777 679185 oder per E-Mail an Info@bsr-schluesseldienst.de.',
      icon: 'fa-phone-volume'
    }
  ];
}
