import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceMediaComponent } from '../../components/service-media/service-media.component';

interface ServiceDetail {
  title: string;
  description: string;
  icon: string;
  items: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceMediaComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  protected readonly serviceDetails: ServiceDetail[] = [
    {
      title: 'Tueroeffnungen',
      description: 'Schonende Oeffnungen fuer Wohnungen, Haeuser, Bueroeinheiten, Keller, Garagen und Nebeneingaenge - transparent abgestimmt und fachgerecht ausgefuehrt.',
      icon: 'fa-door-open',
      items: [
        'Hilfe bei zugefallenen und abgeschlossenen Tueren',
        'Oeffnungen fuer Privatkunden, Gewerbe und Hausverwaltungen',
        'Sorgfaeltige Arbeitsweise mit Blick auf Beschlaege und Tuersituation'
      ]
    },
    {
      title: 'Schloss- und Zylinderwechsel',
      description: 'Wenn Schluessel verloren gehen, Zylinder verschleissen oder nach einem Mieterwechsel schnell gehandelt werden muss, sorgen wir fuer passende Austauschloesungen.',
      icon: 'fa-key',
      items: [
        'Austausch defekter oder unsicherer Profilzylinder',
        'Wechsel von Schloss, Beschlag und Schliesskomponenten',
        'Sinnvoll nach Einbruch, Defekt, Verlust oder Nutzerwechsel'
      ]
    },
    {
      title: 'Ersatzschluessel und Schluesselkopien',
      description: 'Wir erweitern den klassischen Notdienst um praezise Schluesselkopien und Ersatzschluessel fuer viele gaengige Schluesseltypen und Schliessanlagen.',
      icon: 'fa-copy',
      items: [
        'Haus-, Wohnungs- und Nebenschluessel als Zweit- oder Ersatzschluessel',
        'Schluesselkopien fuer viele gaengige Schliessanlagen und Systemschluessel',
        'Praktisch fuer Familien, Hausverwaltungen, Buero und Vermietung'
      ]
    },
    {
      title: 'Mehrfachverriegelung',
      description: 'Mehrfachverriegelungen bieten an mehreren Punkten Halt und Sicherheit. Wir uebernehmen Einbau, Austausch und Instandsetzung fuer Haus- und Sicherheitstueren.',
      icon: 'fa-lock',
      items: [
        'Einbau neuer Mehrfachverriegelungen in Neu- und Bestandsobjekten',
        'Austausch verschlissener Bauteile und defekter Verriegelungsleisten',
        'Reparaturen bei schwergangigen oder klemmenden Schliessmechanismen'
      ]
    },
    {
      title: 'Rund ums Auto',
      description: 'Neben der Fahrzeugoeffnung unterstuetzen wir auch bei typischen Problemen am Autoschluessel - schnell, praxisnah und fuer viele gaengige Modelle.',
      icon: 'fa-car-side',
      items: [
        'Kfz-Tueroeffnungen mit moeglichst schonender Vorgehensweise',
        'Batteriewechsel bei Funk- und Klappschluesseln',
        'Autoschluesselkopien und Ersatzschluessel fuer viele Fahrzeugtypen'
      ]
    },
    {
      title: 'Tresorservice',
      description: 'Tresore gehoeren fuer viele Kunden zur taeglichen Sicherheit. Wir helfen bei Oeffnung, Auswahl, Einbau und laufender Wartung.',
      icon: 'fa-toolbox',
      items: [
        'Tresoroeffnungen bei Defekt, Schluesselverlust oder Bedienungsproblemen',
        'Bestellung und Einbau passender Tresorloesungen fuer Privat und Gewerbe',
        'Wartungen und Funktionspruefungen fuer langfristige Betriebssicherheit'
      ]
    },
    {
      title: 'Sicherheitstechnik',
      description: 'Wir beraten zu mechanischer Absicherung, passenden Schliesssystemen und alltagstauglichen Sicherheitsloesungen fuer Wohn- und Gewerbeobjekte.',
      icon: 'fa-shield-halved',
      items: [
        'Beratung zu Schliesssystemen, Zusatzsicherungen und Beschlaegen',
        'Loesungen fuer Wohnung, Einfamilienhaus, Mehrfamilienhaus und Gewerbe',
        'Praktische Empfehlungen statt ueberladener Technikpakete'
      ]
    },
    {
      title: 'Briefkastenservice und Objektservice',
      description: 'Auch Briefkaesten, Schliessfaecher und Objektanlagen gehoeren zum Alltag eines modernen Schluesseldienstes. Wir kuemmern uns um Oeffnung, Reparatur und Austausch.',
      icon: 'fa-envelope-open-text',
      items: [
        'Oeffnung und Reparatur von Briefkaesten und Briefkastenanlagen',
        'Unterstuetzung fuer Wohnobjekte, Hausverwaltungen und Gewerbe',
        'Klare Ablaeufe bei Austausch, Nachruestung und Instandsetzung'
      ]
    }
  ];

  protected readonly serviceArea = [
    'Freiburg im Breisgau',
    'Emmendingen',
    'Ettenheim',
    'Lahr',
    'Offenburg',
    'Bad Krozingen',
    'Muellheim',
    'Neuenburg',
    'Weil am Rhein',
    'Loerrach',
    'Rheinfelden',
    'weitere Orte in Suedbaden'
  ];
}
