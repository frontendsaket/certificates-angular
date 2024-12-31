import { Component, AfterViewInit } from '@angular/core';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, options);

    // Observe title section
    const titleSection = document.querySelector('.title-section');
    if (titleSection) {
      observer.observe(titleSection);
    }

    // Observe all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      observer.observe(card);
    });
  }
}
