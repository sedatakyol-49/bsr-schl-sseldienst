import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageImageComponent } from '../../components/page-image/page-image.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PageImageComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {}
