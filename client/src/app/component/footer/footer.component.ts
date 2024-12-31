import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {}
