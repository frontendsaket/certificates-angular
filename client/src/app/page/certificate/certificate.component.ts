import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../../services/certificate.service';
import { Certificate } from '../../app.types';
import { DatePipe } from '@angular/common';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [ScrollAnimationDirective, DatePipe, CommonModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent {
  certificateId: string | null = null;  // To store query param
  private certificateService = inject(CertificateService);
  certificate: Certificate = this.certificateService.activeCertificate;
  isDownloading = false;

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

  async downloadCertificate() {
    if (!this.certificate.image) return;
    
    this.isDownloading = true;
    try {
      // Fetch the image
      const response = await fetch(this.certificate.image);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Set filename with certificate title and date
      const fileName = `${this.certificate.title.replace(/\s+/g, '_')}_certificate.png`;
      link.download = fileName;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading certificate:', error);
    } finally {
      this.isDownloading = false;
    }
  }
}
