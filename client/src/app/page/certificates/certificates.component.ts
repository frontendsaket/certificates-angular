import { Component } from '@angular/core';
import { CertificateItemComponent } from "../../component/certificate-item/certificate-item.component";

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CertificateItemComponent],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {

}
