import { Component, inject } from '@angular/core';
import { CertificateItemComponent } from "../../component/certificate-item/certificate-item.component";
import { CertificateService } from '../../services/certificate.service';
import { Certificate } from '../../app.types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CertificateItemComponent, CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {

    certificates: Certificate[] = [];
    router = inject(Router);

    private certificateService = inject(CertificateService);
    ngOnInit(): void {
        const token = localStorage.getItem("auth-token");
        if(!token){
            this.router.navigate(['/login']);
            return;
        }
        this.certificateService.getAllCertificates(token).then(certificates => {
            this.certificates = certificates;
        });
    }
}
