import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../../services/certificate.service';
import { Certificate } from '../../app.types';
import { DatePipe } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [ScrollAnimationDirective, DatePipe],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent {
  certificateId: string | null = null;  // To store query param
  private certificateService = inject(CertificateService);
  certificate: Certificate = this.certificateService.activeCertificate;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Read query parameters
    this.route.queryParams.subscribe(params => {
      this.certificateService.getCertificateById(params['certificateId'] || "").then(certificate => {
        this.certificate = certificate;
      });
    });
  }

  ngOnDestroy(): void {
    this.certificateService.activeCertificate = this.certificateService.emptyCertificate;
  }
}
