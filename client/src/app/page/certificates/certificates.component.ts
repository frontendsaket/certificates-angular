import { Component, inject } from '@angular/core';
import { Certificate } from '../../app.types';
import { CertificateService } from '../../services/certificate.service';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CertificateItemComponent } from "../../component/certificate-item/certificate-item.component";

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [
    CommonModule, 
    ScrollAnimationDirective, 
    FormsModule,
    CertificateItemComponent
  ],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent {
  certificates: Certificate[] = [];
  filteredCertificates: Certificate[] = [];
  isLoading = true;
  searchTerm = '';
  selectedCategory = 'All Categories';
  selectedSort = 'Sort by Date';

  private certificateService = inject(CertificateService);

  ngOnInit() {
    this.loadCertificates();
  }

  async loadCertificates() {
    this.isLoading = true;
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        return;
      }
      this.certificates = await this.certificateService.getAllCertificates(token);
      this.filteredCertificates = [...this.certificates];
    } finally {
      this.isLoading = false;
    }
  }

  searchCertificates(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filterCertificates(searchTerm, this.selectedCategory);
  }

  filterByCategory(event: any) {
    this.selectedCategory = event.target.value;
    this.filterCertificates(this.searchTerm, this.selectedCategory);
  }

  sortCertificates(event: any) {
    this.selectedSort = event.target.value;
    switch (this.selectedSort) {
      case 'Sort by Date':
        this.filteredCertificates.sort((a, b) => 
          new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
        break;
      case 'Sort by Name':
        this.filteredCertificates.sort((a, b) => 
          a.title.localeCompare(b.title));
        break;
    }
  }

  private filterCertificates(searchTerm: string, category: string) {
    this.filteredCertificates = this.certificates.filter(cert => {
      return cert.title.toLowerCase().includes(searchTerm) ||
             cert.description.toLowerCase().includes(searchTerm);
    });
  }
}
