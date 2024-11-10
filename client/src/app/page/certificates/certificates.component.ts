import { Component, inject } from '@angular/core';
import { CertificateItemComponent } from "../../component/certificate-item/certificate-item.component";
import { CertificateService } from '../../services/certificate.service';
import { Certificate } from '../../app.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CertificateItemComponent, CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {

    certificates: Certificate[] = [];

    private certificateService = inject(CertificateService);
    ngOnInit(): void {
        this.certificateService.getAllCertificates().then(certificates => {
            this.certificates = certificates;
        });
    }
}
