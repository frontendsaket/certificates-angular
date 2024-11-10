import { Component, inject } from '@angular/core';
import { CertificateItemComponent } from "../../component/certificate-item/certificate-item.component";
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CertificateItemComponent],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {

    private certificateService = inject(CertificateService);
    ngOnInit(): void {
    }
}
