import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { BusinessReviews, ReviewsService } from '../../services/reviews.service';

interface ExpandableServiceCard {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  bullets: string[];
  icon: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: '0', marginTop: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: '1', marginTop: '*', overflow: 'hidden' })),
      transition('collapsed <=> expanded', [animate('280ms ease')])
    ])
  ]
})
export class HomeComponent implements OnInit {
  protected readonly stars = [1, 2, 3, 4, 5];

  protected readonly highlights = [
    'Türöffnungen, Schloss- und Zylinderwechsel',
    'Privat, Vermietung und Gewerbe in Südbaden',
    'Klare Kommunikation vor dem Einsatz'
  ];

  protected readonly regions = [
    'Freiburg',
    'Denzlingen',
    'Emmendingen',
    'Lahr',
    'Offenburg',
    'Bad Krozingen',
    'Müllheim',
    'Lörrach',
    'Weil am Rhein',
    'Rheinfelden',
    'Ettenheim',
    'und Umgebung'
  ];

  protected readonly trustPoints = [
    {
      value: 'Transparent',
      title: 'Preise klar eingeordnet',
      description: 'Wichtige Positionen sind sichtbar. Abweichender Aufwand wird vor der Ausführung erklärt.'
    },
    {
      value: 'Regional',
      title: 'Kurze Wege statt Callcenter',
      description: 'Freiburg und weite Teile von Südbaden werden regional betreut, nicht über anonyme Vermittlung.'
    },
    {
      value: 'Sauber',
      title: 'Situationsgerechtes Arbeiten',
      description: 'Der Fokus liegt auf einer sauberen Öffnung und auf nachvollziehbaren Empfehlungen vor Ort.'
    }
  ];

  protected readonly workflowSteps = [
    {
      title: 'Anrufen und Lage schildern',
      description: 'Sie schildern kurz Türtyp, Ort und Situation. Auf dieser Basis kommt direkt eine erste Einordnung.'
    },
    {
      title: 'Preis und Vorgehen abstimmen',
      description: 'Bevor begonnen wird, wird besprochen, welche Öffnung oder welcher Wechsel sinnvoll ist.'
    },
    {
      title: 'Einsatz und kurze Nachbesprechung',
      description: 'Nach der Arbeit wird erklärt, was gemacht wurde und ob weiterer Handlungsbedarf besteht.'
    }
  ];

  protected readonly contactHighlights = [
    {
      title: 'Geschäftsstelle',
      value: 'Hessenstraße 3',
      detail: 'Region Freiburg und Umgebung',
      icon: 'fa-location-dot'
    },
    {
      title: 'Jetzt anrufen',
      value: '01777 7679185',
      detail: 'Direkter telefonischer Erstkontakt',
      icon: 'fa-phone'
    },
    {
      title: 'E-Mail',
      value: 'bsr-schluesseldienst@outlook.de',
      detail: 'Für planbare Anfragen und Rückfragen',
      icon: 'fa-envelope'
    }
  ];

  protected readonly assuranceCards = [
    {
      title: 'Faire Preisstruktur',
      description: 'Wichtige Positionen sind vorab sichtbar. Zusätzlicher Aufwand wird nicht versteckt, sondern eingeordnet.',
      icon: 'fa-thumbs-up'
    },
    {
      title: 'Erreichbarkeit',
      description: 'Telefonisch direkt erreichbar. Für dringende Situationen zählt vor allem eine klare erste Einordnung.',
      icon: 'fa-clock'
    },
    {
      title: 'Kostenlose Ersteinschätzung',
      description: 'Vor dem Einsatz wird die Situation kurz besprochen, damit Leistung und Richtung nicht unklar bleiben.',
      icon: 'fa-users'
    },
    {
      title: 'Notdienst 24/7',
      description: 'Wenn es eilig ist, soll die Kontaktaufnahme nicht an komplizierten Formularen scheitern.',
      icon: 'fa-circle-exclamation'
    }
  ];

  protected readonly serviceCards: ExpandableServiceCard[] = [
    {
      id: 'tueroeffnung',
      eyebrow: 'Schnelle Hilfe',
      title: 'Türöffnungen im Wohn- und Gewerbebereich',
      summary: 'Für zugefallene oder abgeschlossene Türen mit einem Ablauf, der telefonisch schon vorstrukturiert wird.',
      bullets: [
        'Einordnung nach zugefallener oder abgeschlossener Tür',
        'Saubere Öffnung mit Blick auf Tür und Beschlag',
        'Klare Abstimmung, bevor gearbeitet wird'
      ],
      icon: 'fa-door-open',
      isExpanded: true
    },
    {
      id: 'schlosswechsel',
      eyebrow: 'Sicherheit',
      title: 'Zylinder- und Schlosswechsel nach Bedarf',
      summary: 'Sinnvoll nach Verlust, Defekt, Mieterwechsel oder wenn eine bestehende Lösung nicht mehr vertrauenswürdig ist.',
      bullets: [
        'Wechsel einzelner Zylinder oder kompletter Schlösser',
        'Einordnung für Wohnung, Haus, Keller oder Gewerbe',
        'Beratung ohne unnötige Zusatzverkäufe'
      ],
      icon: 'fa-key',
      isExpanded: false
    },
    {
      id: 'objektbetreuung',
      eyebrow: 'Für Verwalter',
      title: 'Unterstützung für Vermieter und Hausverwaltungen',
      summary: 'Wenn es nicht nur um einen Notfall geht, sondern um planbare Einsätze, Rückfragen und saubere Dokumentation.',
      bullets: [
        'Planbare Termine im regionalen Einsatzgebiet',
        'Nachvollziehbare Positionen für Eigentümer oder Verwaltung',
        'Geeignet für wiederkehrende Anliegen an Objekten'
      ],
      icon: 'fa-building',
      isExpanded: false
    }
  ];

  protected reviewsData?: BusinessReviews;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviewsService.getBusinessReviews().subscribe(data => {
      this.reviewsData = data;
    });
  }

  protected toggleService(selectedId: string): void {
    this.serviceCards.forEach(card => {
      card.isExpanded = card.id === selectedId ? !card.isExpanded : false;
    });
  }
}
