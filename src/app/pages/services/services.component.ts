import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageImageComponent } from '../../components/page-image/page-image.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, PageImageComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {}
