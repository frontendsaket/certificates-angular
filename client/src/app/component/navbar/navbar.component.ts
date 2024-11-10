import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public authService = inject(AuthService);
  isLoggedIn = false;

  ngOnInit() {
    this.verifyLogin();
  }

  verifyLogin(){
    setTimeout(()=>{
      localStorage.getItem("auth-token") ? this.isLoggedIn = true : this.isLoggedIn = false;
    },100)
  }

  handleLogout(){
    this.authService.logoutUser();
    this.isLoggedIn = false;
  }
}
