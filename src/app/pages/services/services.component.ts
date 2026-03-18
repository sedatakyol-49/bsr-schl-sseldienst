import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageImageComponent } from '../../components/page-image/page-image.component';
import { ServiceMediaComponent } from '../../components/service-media/service-media.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, PageImageComponent, ServiceMediaComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {}
