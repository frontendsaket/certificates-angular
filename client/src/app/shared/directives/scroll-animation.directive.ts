import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[scrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements AfterViewInit {
  @Input() animationClass: string = 'animate';
  @Input() threshold: number = 0.1;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: this.threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.element.nativeElement.classList.add(this.animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(this.element.nativeElement);
  }
} 