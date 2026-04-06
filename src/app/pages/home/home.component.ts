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
    'Willkommen bei BSR Schluesseldienst, Ihrem zertifizierten Partner fuer Schluessel- und Sicherheitstechnik. Wir bieten professionelle Betreuung in Freiburg und Suedbaden - diskret, effizient und mit hohem Qualitaetsanspruch.',
    'Neben schnellen Notoeffnungen umfasst unser Angebot auch Schluesselkopien, Mehrfachverriegelungen, Autoschluesselservice, Tresorservice und klassische Schliess- und Reparaturarbeiten fuer Privatkunden, Gewerbe und Hausverwaltungen.'
  ];

  protected readonly serviceCards: ServiceCard[] = [
    {
      title: 'Tueroeffnung',
      description: 'Schonende Oeffnungen bei zugefallenen oder abgeschlossenen Tueren im privaten und gewerblichen Bereich.',
      icon: 'fa-door-open',
      highlights: ['Wohnung, Haus und Buero', 'Auch bei abgeschlossenen Tueren']
    },
    {
      title: 'Schlosswechsel',
      description: 'Zylinder- und Schlosswechsel nach Verlust, Defekt, Mieterwechsel oder akutem Sicherheitsbedarf.',
      icon: 'fa-key',
      highlights: ['Zylinder, Beschlaege, Schloesser', 'Sauber montiert und erklaert']
    },
    {
      title: 'Ersatzschluessel und Kopien',
      description: 'Praezise Schluesselkopien und Ersatzschluessel fuer viele Haus-, Wohnungs- und gaengige Schliessanlagenschluessel.',
      icon: 'fa-copy',
      highlights: ['Zweit- und Ersatzschluessel', 'Auch fuer Schliessanlagen']
    },
    {
      title: 'Mehrfachverriegelung',
      description: 'Einbau, Austausch und Reparatur moderner Mehrfachverriegelungen fuer Haus- und Sicherheitstueren.',
      icon: 'fa-lock',
      highlights: ['Mehr Schutz an mehreren Punkten', 'Passend fuer Neu- und Bestandsobjekte']
    },
    {
      title: 'Rund ums Auto',
      description: 'Kfz-Tueroeffnungen, Batteriewechsel am Autoschluessel sowie Ersatz- und Zweitschluessel fuer viele Fahrzeugtypen.',
      icon: 'fa-car-side',
      highlights: ['Beschaedigungsarme Fahrzeugoeffnung', 'Funk- und Transponderschluessel']
    },
    {
      title: 'Tresorservice',
      description: 'Tresoroeffnungen, Bestellung und Einbau sowie Wartung fuer Privatkunden, Kanzleien, Praxen und Gewerbe.',
      icon: 'fa-toolbox',
      highlights: ['Oeffnung bei Defekt oder Verlust', 'Beratung zu passender Loesung']
    }
  ];

  protected readonly fairPricing: PricingItem[] = [
    {
      title: 'Zugefallene Tuer',
      price: 'ab 89 EUR',
      description: 'Tagsueber mit transparenter Ersteinschaetzung vor Beginn.'
    },
    {
      title: 'Abgeschlossene Tuer',
      price: 'ab 119 EUR',
      description: 'Je nach Aufwand, Uhrzeit und Tuersituation klar abgestimmt.'
    },
    {
      title: 'Schloss- oder Zylinderwechsel',
      price: 'ab 89 EUR',
      description: 'Material und Ausfuehrung werden nachvollziehbar eingeordnet.'
    }
  ];

  protected readonly regions = [
    'Freiburg im Breisgau',
    'Denzlingen',
    'Emmendingen',
    'Waldkirch',
    'Bad Krozingen',
    'Muellheim',
    'Lahr',
    'Offenburg',
    'Loerrach',
    'Weil am Rhein',
    'Rheinfelden',
    'Suedbaden & Umgebung'
  ];

  protected readonly faqItems: FaqItem[] = [
    {
      question: 'Wie schnell ist BSR Schluesseldienst im Raum Freiburg vor Ort?',
      answer: 'Je nach Standort und Verkehrslage helfen wir in Freiburg und Suedbaden schnell und regional koordiniert weiter.',
      icon: 'fa-clock',
      isExpanded: true
    },
    {
      question: 'Welche Leistungen bieten Sie an?',
      answer: 'Zu den Kernleistungen zaehlen Tueroeffnungen, Schloss- und Zylinderwechsel, Schluesselkopien, Mehrfachverriegelungen, Autoschluesselservice, Tresorservice und Briefkastenservice.',
      icon: 'fa-toolbox',
      isExpanded: false
    },
    {
      question: 'Wie erfahre ich den Preis?',
      answer: 'Vor dem Einsatz erhalten Sie eine klare telefonische Ersteinschaetzung. Zusaetzlicher Aufwand wird nicht versteckt, sondern nachvollziehbar erklaert.',
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
