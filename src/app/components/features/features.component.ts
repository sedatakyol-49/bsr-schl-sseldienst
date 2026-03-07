import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-gray-50 py-16">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Left Column -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6">Schlüsseldienst mit Festpreisgarantie</h2>
            <p class="text-gray-700 mb-6">
              Sie suchen einen Schlüsseldienst? Wir öffnen Türen günstig und beschädigungsfrei. 
              Lassen Sie sich jetzt von einem unserer Techniker beraten. Rufen Sie uns an!
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Kurze Wartezeiten</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Zahlung: Bar, EC-Karte oder Kreditkarte</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Schnelle Auftragsbearbeitung noch am selben Tag</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                <span>Versichert gegen Schäden</span>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6">Zuverlässiger Schlüsseldienst in der Nähe gesucht?</h2>
            <p class="text-gray-700 mb-6">
              Stehen Sie gerade vor verschlossenen Türen, weil Sie auf einmal Ihren Haustürschlüssel 
              nicht mehr finden können, sich ausgesperrt haben oder das Schloss klemmt?
            </p>
            <p class="text-gray-700 mb-6">
              In einer solch unangenehme Situation ist man auf die sofortige Hilfe und Unterstützung 
              von einem qualifizierten Schlüsseldienst wie unserem Schlüsseldienst angewiesen.
            </p>
            <p class="text-gray-700">
              Ganz gleich, ob Notöffnung Ihrer Tür, aufsperren von Tresor oder Pkw, Beratungen zu 
              Einbruchschutz und Sicherheitstechnik oder die Reparatur einer defekten Tür sowie 
              den Schlossaustausch – bei unserem Schlüsseldienst können Sie alle anfallenden 
              Arbeiten in Auftrag geben.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FeaturesComponent {}