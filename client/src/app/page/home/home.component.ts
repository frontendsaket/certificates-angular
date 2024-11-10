import { Component } from '@angular/core';
import { HeroComponent } from '../../component/hero/hero.component';
import { ServicesComponent } from "../../component/services/services.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
