import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = "";
  otp = "";
  error = "";
  message = "";

  resetError(){
    setTimeout(()=>{
      this.error = "";
    },8000)
  }

  resetMessage(){
    setTimeout(()=>{
      this.message = "";
    },8000)
  }

  private authService = inject(AuthService);
  private utilService = inject(UtilService);

  router = inject(Router);

  async onOtp(){
    console.log(this.email);
    if(!this.utilService.isEmail(this.email)){
      this.error = "Invalid Email!";
      this.resetError();
      return;
    }

    if(this.email==""){
      this.error = "All Fields Are Required!";
      this.resetError();
      return;
    }
    const reponse = await this.authService.sendOtp(this.email);
    if(reponse){
      this.message = "OTP Sent Successfully!";
      this.resetMessage();
    }else{
      this.error = this.authService.error;
      this.resetError();
    }
  }

  async onLogin(){
    if(!this.utilService.isEmail(this.email)){
      this.error = "Invalid Email!";
      this.resetError();
      return;
    }

    if(this.email=="" || this.otp==""){
      this.error = "All Fields Are Required!";
      this.resetError();
      return;
    }
    const reponse = await this.authService.loginUser(this.email, this.otp);
    if(reponse){
      console.log(reponse);
      this.router.navigate(['/']);
    }else{
      this.error = this.authService.error;
      this.resetError();
    }
  }

}
