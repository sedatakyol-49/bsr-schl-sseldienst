import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly regions = ['Freiburg', 'Emmendingen', 'Ettenheim', 'Lahr', 'Offenburg', 'Bad Krozingen', 'Müllheim', 'Neuenburg', 'Weil am Rhein', 'Lörrach', 'Rheinfelden', 'und Umgebung'];

  protected readonly highlights = [
    'Schnelle Hilfe bei Türöffnungen und Schlosswechsel.',
    'Faire Preise mit klarer Preisliste.',
    'Saubere Einsätze für Privat und Gewerbe.'
  ];

  protected readonly trustPoints = [
    {
      title: 'Regional erreichbar',
      description: 'Von Denzlingen aus betreuen wir Freiburg und große Teile von Südbaden schnell und planbar.',
      icon: 'fa-location-dot'
    },
    {
      title: 'Klare Preisstruktur',
      description: 'Die wichtigsten Positionen sind vorab ersichtlich. Zusatzaufwand wird transparent kommuniziert.',
      icon: 'fa-euro-sign'
    },
    {
      title: 'Fachgerechte Arbeit',
      description: 'Wir arbeiten sauber, situationsgerecht und mit Fokus auf funktionale, sichere Lösungen.',
      icon: 'fa-shield-halved'
    }
  ];
}
