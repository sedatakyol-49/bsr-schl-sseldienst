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
      title: 'Türöffnungen',
      description: 'Schonende Öffnungen für Wohnungen, Häuser, Büroeinheiten, Keller, Garagen und Nebeneingänge - transparent abgestimmt und fachgerecht ausgeführt.',
      icon: 'fa-door-open',
      items: [
        'Hilfe bei zugefallenen und abgeschlossenen Türen',
        'Öffnungen für Privatkunden, Gewerbe und Hausverwaltungen',
        'Sorgfältige Arbeitsweise mit Blick auf Beschläge und Türsituation'
      ]
    },
    {
      title: 'Schloss- und Zylinderwechsel',
      description: 'Wenn Schlüssel verloren gehen, Zylinder verschleißen oder nach einem Mieterwechsel schnell gehandelt werden muss, sorgen wir für passende Austauschlösungen.',
      icon: 'fa-key',
      items: [
        'Profilschließzylinder-Wechsel mit passender Materialabstimmung',
        'Schloss- und Beschlagwechsel nach Defekt, Einbruch oder Nutzerwechsel',
        'Austausch und Reparatur von Mehrfachverriegelungen'
      ]
    },
    {
      title: 'Ersatzschlüssel und Schlüsselkopien',
      description: 'Wir erweitern den klassischen Notdienst um präzise Schlüsselkopien und Ersatzschlüssel für viele gängige Schlüsseltypen und Schließanlagen.',
      icon: 'fa-copy',
      items: [
        'Haus-, Wohnungs- und Nebenschlüssel als Zweit- oder Ersatzschlüssel',
        'Schlüsselkopien für viele gängige Schließanlagen und Systemschlüssel',
        'Sonderbestellungen und Aufbewahrungsservice nach individueller Abstimmung'
      ]
    },
    {
      title: 'Mehrfachverriegelung',
      description: 'Mehrfachverriegelungen bieten an mehreren Punkten Halt und Sicherheit. Wir übernehmen Einbau, Austausch und Instandsetzung für Haus- und Sicherheitstüren.',
      icon: 'fa-lock',
      items: [
        'Einbau neuer Mehrfachverriegelungen in Neu- und Bestandsobjekten',
        'Austausch verschlissener Bauteile und defekter Verriegelungsleisten',
        'Reparaturen bei schwergängigen oder klemmenden Schließmechanismen'
      ]
    },
    {
      title: 'Rund ums Auto',
      description: 'Neben der Fahrzeugöffnung unterstützen wir auch bei typischen Problemen am Autoschlüssel - schnell, praxisnah und für viele gängige Modelle.',
      icon: 'fa-car-side',
      items: [
        'Kfz-Türöffnungen mit möglichst schonender Vorgehensweise',
        'Batteriewechsel bei Funk- und Klappschlüsseln',
        'Autoschlüsselkopien und Ersatzschlüssel für viele Fahrzeugtypen'
      ]
    },
    {
      title: 'Tresorservice',
      description: 'Tresore gehören für viele Kunden zur täglichen Sicherheit. Wir helfen bei Öffnung, Auswahl, Einbau und laufender Wartung.',
      icon: 'fa-toolbox',
      items: [
        'Tresoröffnungen bei Defekt, Schlüsselverlust oder Bedienungsproblemen',
        'Bestellung und Einbau passender Tresorlösungen für Privat und Gewerbe',
        'Wartungen und Funktionsprüfungen für langfristige Betriebssicherheit'
      ]
    },
    {
      title: 'Sicherheitstechnik',
      description: 'Wir beraten zu mechanischer Absicherung, passenden Schließsystemen und alltagstauglichen Sicherheitslösungen für Wohn- und Gewerbeobjekte.',
      icon: 'fa-shield-halved',
      items: [
        'Montage von Panzerriegeln, Zusatzkastenschlössern und Schutzrosetten',
        'Türschließer, Bolzen, Riegel, Bandseitensicherung und Türspion-Montage',
        'Praktische Empfehlungen für Wohnung, Haus, Mehrfamilienhaus und Gewerbe'
      ]
    },
    {
      title: 'Schließanlagen und elektrische Systeme',
      description: 'Für Objekte, Gewerbe und Hausverwaltungen übernehmen wir Schließanlagen, elektrische Schließsysteme und Zugangslösungen nach individueller Planung.',
      icon: 'fa-microchip',
      items: [
        'Einbau und Wartungsverträge für Schließanlagen',
        'Installation und Instandsetzung elektrischer Schließsysteme',
        'Zutrittskontrollsysteme, Transponder-Programmierung und Batteriewechsel'
      ]
    },
    {
      title: 'Briefkastenservice und Objektservice',
      description: 'Auch Briefkästen, Schließfächer und Objektanlagen gehören zum Alltag eines modernen Schlüsseldienstes. Wir kümmern uns um Öffnung, Reparatur und Austausch.',
      icon: 'fa-envelope-open-text',
      items: [
        'Öffnung und Reparatur von Briefkästen und Briefkastenanlagen',
        'Montage von Briefkästen und objektbezogenen Schließlösungen',
        'Unterstützung für Wohnobjekte, Hausverwaltungen und Gewerbe',
        'Klare Abläufe bei Austausch, Nachrüstung und Instandsetzung'
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
    'Müllheim',
    'Neuenburg',
    'Weil am Rhein',
    'Lörrach',
    'Rheinfelden',
    'weitere Orte in Südbaden'
  ];
}
