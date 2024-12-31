import { Component, Input } from '@angular/core';
import { Certificate } from '../../app.types';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-certificate-item',
  standalone: true,
  imports: [RouterModule, CommonModule, DatePipe],
  templateUrl: './certificate-item.component.html',
  styleUrls: ['./certificate-item.component.css']
})
export class CertificateItemComponent {
  @Input() certificate!: Certificate;
}
