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
    'Türöffnungen und Schlosswechsel',
    'Privat, Vermietung und Gewerbe',
    'Planbare Einsätze in Südbaden'
  ];

  protected readonly trustPoints = [
    {
      title: 'Regional erreichbar',
      description: 'Von Denzlingen aus betreuen wir Freiburg und große Teile von Südbaden mit kurzen Wegen.',
      icon: 'fa-location-dot'
    },
    {
      title: 'Klare Preisstruktur',
      description: 'Die wichtigsten Positionen sind vorab ersichtlich. Zusätzlicher Aufwand wird nachvollziehbar erklärt.',
      icon: 'fa-euro-sign'
    },
    {
      title: 'Fachgerechte Arbeit',
      description: 'Wir arbeiten situationsgerecht und mit Blick auf funktionale, sichere Lösungen.',
      icon: 'fa-shield-halved'
    }
  ];
}
