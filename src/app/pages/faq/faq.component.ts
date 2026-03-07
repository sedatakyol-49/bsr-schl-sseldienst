import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class FaqComponent {
  faqs = [
    {
      question: 'Wie schnell ist BSR Schluesseldienst vor Ort?',
      answer: 'Je nach Standort und Verkehrslage reagieren wir fuer Freiburg und Suedbaden schnell und regional abgestimmt.',
      isExpanded: false,
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      question: 'Was kostet eine Tueroeffnung?',
      answer: 'Die wichtigsten Preispositionen finden Sie auf unserer Preisliste. Fuer eine zugefallene Tuer beginnt der Einsatz tagsueber bei 89 EUR.',
      isExpanded: false,
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      question: 'Arbeitet ihr auch abends oder an Feiertagen?',
      answer: 'Ja. Fuer Abend-, Nacht- sowie Sonn- und Feiertagseinsaetze gelten die entsprechenden Preisstaffeln aus der Preisliste.',
      isExpanded: false,
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      question: 'Welche Regionen deckt ihr ab?',
      answer: 'Freiburg, Emmendingen, Ettenheim, Lahr, Offenburg, Bad Krozingen, Muellheim, Neuenburg, Weil am Rhein, Loerrach, Rheinfelden und weitere Orte in Suedbaden.',
      isExpanded: false,
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
    },
    {
      question: 'Koennt ihr auch Zylinder oder Schloesser wechseln?',
      answer: 'Ja. Zylinderwechsel, Schlosswechsel und Reparaturen an Tueren und Beschlaegen gehoeren zu unserem Standard-Leistungsspektrum.',
      isExpanded: false,
      icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
    },
    {
      question: 'Wie kann ich euch am schnellsten erreichen?',
      answer: 'Am direktesten ueber 01777 679185 oder per E-Mail an bsr-schluesseldienst@outlook.de.',
      isExpanded: false,
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    }
  ];

  toggleFaq(faq: any) {
    faq.isExpanded = !faq.isExpanded;
  }
}
