import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PageImageComponent } from '../../components/page-image/page-image.component';
import { ServiceMediaComponent } from '../../components/service-media/service-media.component';
import { BusinessReviews, ReviewsService } from '../../services/reviews.service';

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

interface PricingItem {
  title: string;
  price: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PageImageComponent, ServiceMediaComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  protected readonly stars = [1, 2, 3, 4, 5];
  protected reviewsPaused = false;

  protected readonly highlights = [
    '24/7 erreichbar',
    'Zertifiziert und regional',
    'Faire und klare Preise'
  ];

  protected readonly introParagraphs = [
    'Willkommen bei BSR Schlüsseldienst, Ihrem zertifizierten Partner für Schlüssel- und Sicherheitstechnik. Wir gewährleisten professionelle Betreuung in Freiburg und Südbaden – diskret, effizient und nach höchsten Standards.',
    'Bei BSR Schlüsseldienst erhalten Sie zuverlässige Hilfe rund um Schlüssel, Schlösser und Sicherheit – schnell, fachgerecht und zu fairen Preisen. Ob Notfall, Reparatur oder Beratung: Wir sind Ihr Ansprechpartner in Freiburg und der gesamten Region Südbaden.'
  ];

  protected readonly serviceCards: ServiceCard[] = [
    {
      title: 'Türöffnung',
      description: 'Schonende Öffnungen bei zugefallenen oder abgeschlossenen Türen im privaten und gewerblichen Bereich.',
      icon: 'fa-door-open',
      image: 'assets/images/tor-foto.jpeg'
    },
    {
      title: 'Schlosswechsel',
      description: 'Zylinder- und Schlosswechsel nach Verlust, Defekt, Mieterwechsel oder Sicherheitsbedarf.',
      icon: 'fa-key',
      image: 'assets/images/Schlosswechsel.jpeg'
    },
    {
      title: 'Sicherheitstechnik',
      description: 'Beratung und passende Lösungen rund um Schließsysteme, Beschläge und zusätzliche Absicherung.',
      icon: 'fa-shield-halved',
      image: 'assets/images/scherhitstechnike.jpeg'
    },
    {
      title: 'Briefkastenservice',
      description: 'Öffnung, Reparatur und Austausch von Briefkasten- und Schließanlagen für Wohnobjekte.',
      icon: 'fa-envelope-open-text',
      image: 'assets/images/briefkasten-foto.jpeg'
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
      title: 'Schloss- oder Zylinderwechsel',
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
      isExpanded: true
    },
    {
      question: 'Welche Leistungen bieten Sie an?',
      answer: 'Zu unseren Kernleistungen zählen Türöffnungen, Schlosswechsel, Zylinderwechsel, Briefkastenservice und Hilfe rund um Sicherheitstechnik.',
      isExpanded: false
    },
    {
      question: 'Wie erfahre ich den Preis?',
      answer: 'Vor dem Einsatz erhalten Sie eine klare telefonische Ersteinschätzung. Zusätzlicher Aufwand wird nicht versteckt, sondern nachvollziehbar erklärt.',
      isExpanded: false
    },
    {
      question: 'Wie erreiche ich Sie am schnellsten?',
      answer: 'Direkt telefonisch unter 01777 679185 oder per E-Mail an Info@bsr-schluesseldienst.de.',
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

  protected pauseReviews(): void {
    this.reviewsPaused = true;
  }

  protected resumeReviews(): void {
    this.reviewsPaused = false;
  }

  protected toggleFaq(selectedFaq: FaqItem): void {
    this.faqItems.forEach(faq => {
      faq.isExpanded = faq === selectedFaq ? !faq.isExpanded : false;
    });
  }
}
