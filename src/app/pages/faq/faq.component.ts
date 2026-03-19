import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FAQ_ITEMS } from '../../data/faq-items';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: '1' })),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')])
    ])
  ]
})
export class FaqComponent {
  faqs = FAQ_ITEMS.map(faq => ({ ...faq, isExpanded: false }));

  toggleFaq(faq: any) {
    faq.isExpanded = !faq.isExpanded;
  }
}
