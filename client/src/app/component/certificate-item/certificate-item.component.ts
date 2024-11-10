import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Certificate } from '../../app.types';

@Component({
  selector: 'app-certificate-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './certificate-item.component.html',
  styleUrl: './certificate-item.component.css'
})
export class CertificateItemComponent {
    @Input() certificate!: Certificate;
}
