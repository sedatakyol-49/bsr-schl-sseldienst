import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-emergency-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './emergency-button.component.html',
  styleUrls: ['./emergency-button.component.scss']
})
export class EmergencyButtonComponent {
  protected panelOpen = false;

  protected openPanel(): void {
    this.panelOpen = true;
  }

  protected closePanel(): void {
    this.panelOpen = false;
  }

  protected togglePanel(): void {
    this.panelOpen = !this.panelOpen;
  }
}
