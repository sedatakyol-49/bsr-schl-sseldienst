import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ServiceMediaComponent } from '../../components/service-media/service-media.component';
import { BusinessReviews, ReviewsService } from '../../services/reviews.service';

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  highlights?: string[];
}

interface PricingItem {
  title: string;
  price: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
  icon: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ServiceMediaComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  protected readonly stars = [1, 2, 3, 4, 5];

  protected readonly highlights = [
    '24/7 erreichbar',
    'Zertifiziert und regional',
    'Faire und klare Preise'
  ];

  protected readonly introParagraphs = [
    'Willkommen bei BSR Schlüsseldienst, Ihrem zertifizierten Partner für Schlüssel- und Sicherheitstechnik. Wir bieten professionelle Betreuung in Freiburg und Südbaden - diskret, effizient und mit hohem Qualitätsanspruch.',
    'Neben schnellen Notöffnungen umfasst unser Angebot auch Schlüsselkopien, Schließanlagen, Mehrfachverriegelungen, Autoschlüsselservice, Montagearbeiten, elektrische Schließsysteme und klassische Reparaturarbeiten für Privatkunden, Gewerbe und Hausverwaltungen.'
  ];

  protected readonly serviceCards: ServiceCard[] = [
    {
      title: 'Türöffnung',
      description: 'Schonende Öffnungen bei zugefallenen oder abgeschlossenen Türen im privaten und gewerblichen Bereich.',
      icon: 'fa-door-open',
      highlights: ['Wohnung, Haus und Büro', 'Auch bei abgeschlossenen Türen']
    },
    {
      title: 'Schlosswechsel',
      description: 'Zylinder- und Schlosswechsel nach Verlust, Defekt, Mieterwechsel oder akutem Sicherheitsbedarf.',
      icon: 'fa-key',
      highlights: ['Zylinder, Beschläge, Schlösser', 'Sauber montiert und erklärt']
    },
    {
      title: 'Ersatzschlüssel und Kopien',
      description: 'Präzise Schlüsselkopien und Ersatzschlüssel für viele Haus-, Wohnungs- und gängige Schließanlagenschlüssel.',
      icon: 'fa-copy',
      highlights: ['Zweit- und Ersatzschlüssel', 'Auch für Schließanlagen']
    },
    {
      title: 'Mehrfachverriegelung',
      description: 'Einbau, Austausch und Reparatur moderner Mehrfachverriegelungen für Haus- und Sicherheitstüren.',
      icon: 'fa-lock',
      highlights: ['Mehr Schutz an mehreren Punkten', 'Passend für Neu- und Bestandsobjekte']
    },
    {
      title: 'Rund ums Auto',
      description: 'Kfz-Türöffnungen, Batteriewechsel am Autoschlüssel sowie Ersatz- und Zweitschlüssel für viele Fahrzeugtypen.',
      icon: 'fa-car-side',
      highlights: ['Beschädigungsarme Fahrzeugöffnung', 'Funk- und Transponderschlüssel']
    },
    {
      title: 'Tresorservice',
      description: 'Tresoröffnungen, Bestellung und Einbau sowie Wartung für Privatkunden, Kanzleien, Praxen und Gewerbe.',
      icon: 'fa-toolbox',
      highlights: ['Öffnung bei Defekt oder Verlust', 'Beratung zu passender Lösung']
    },
    {
      title: 'Sicherheitstechnik',
      description: 'Montage von Panzerriegeln, Zusatzkastenschlössern, Schutzrosetten, Türschließern und weiteren Sicherungen.',
      icon: 'fa-shield-halved',
      highlights: ['Mechanische Zusatzsicherungen', 'Montage mit Materialabstimmung']
    },
    {
      title: 'Elektrische Schließsysteme',
      description: 'Installation, Wartung und Instandsetzung elektrischer Systeme sowie Zutrittskontrolle und Transponder-Programmierung.',
      icon: 'fa-microchip',
      highlights: ['Zutrittskontrollsysteme', 'Service nach individuellem Angebot']
    },
    {
      title: 'Briefkastenservice',
      description: 'Öffnung, Reparatur, Austausch und Montage von Briefkästen und Briefkastenanlagen.',
      icon: 'fa-envelope-open-text',
      highlights: ['Briefkasten Montage', 'Objekte und Hausverwaltungen']
    }
  ];

  protected readonly fairPricing: PricingItem[] = [
    {
      title: 'Zugefallene Tür',
      price: 'ab 89 EUR',
      description: 'Tagsüber mit transparenter Ersteinschätzung vor Beginn.'
    },
    {
      title: 'Abgeschlossene Tür',
      price: 'ab 119 EUR',
      description: 'Je nach Aufwand, Uhrzeit und Türsituation klar abgestimmt.'
    },
    {
      title: 'Profilschließzylinder-Wechsel',
      price: 'ab 89 EUR',
      description: 'Material und Ausführung werden nachvollziehbar eingeordnet.'
    }
  ];

  protected readonly regions = [
    'Freiburg im Breisgau',
    'Denzlingen',
    'Emmendingen',
    'Waldkirch',
    'Bad Krozingen',
    'Müllheim',
    'Lahr',
    'Offenburg',
    'Lörrach',
    'Weil am Rhein',
    'Rheinfelden',
    'Südbaden & Umgebung'
  ];

  protected readonly faqItems: FaqItem[] = [
    {
      question: 'Wie schnell ist BSR Schlüsseldienst im Raum Freiburg vor Ort?',
      answer: 'Je nach Standort und Verkehrslage helfen wir in Freiburg und Südbaden schnell und regional koordiniert weiter.',
      icon: 'fa-clock',
      isExpanded: true
    },
    {
      question: 'Welche Leistungen bieten Sie an?',
      answer: 'Zu den Kernleistungen zählen Türöffnungen, Schloss- und Zylinderwechsel, Schlüsselkopien, Schließanlagen, Autoschlüsselservice, Montage von Sicherheitstechnik, elektrische Schließsysteme und Briefkastenservice.',
      icon: 'fa-toolbox',
      isExpanded: false
    },
    {
      question: 'Wie erfahre ich den Preis?',
      answer: 'Vor dem Einsatz erhalten Sie eine klare telefonische Ersteinschätzung. Zusätzlicher Aufwand wird nicht versteckt, sondern nachvollziehbar erklärt.',
      icon: 'fa-euro-sign',
      isExpanded: false
    },
    {
      question: 'Wie erreiche ich Sie am schnellsten?',
      answer: 'Direkt telefonisch unter 01777 679185 oder per E-Mail an info@bsr-schluesseldienst.de.',
      icon: 'fa-phone',
      isExpanded: false
    }
  ];

  protected reviewsData?: BusinessReviews;

  constructor(private readonly reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviewsService.getBusinessReviews().subscribe(data => {
      this.reviewsData = data;
    });
  }

  protected get scrollingReviews() {
    return this.reviewsData?.reviews?.length
      ? [...this.reviewsData.reviews, ...this.reviewsData.reviews]
      : [];
  }

  protected toggleFaq(selectedFaq: FaqItem): void {
    this.faqItems.forEach(faq => {
      faq.isExpanded = faq === selectedFaq ? !faq.isExpanded : false;
    });
  }
}
