import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ScrollAnimationDirective, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = "";
  otpDigits: string[] = new Array(6).fill('');
  error = "";
  message = "";
  showOtpInput = false;
  isLoading = false;

  private authService = inject(AuthService);
  private utilService = inject(UtilService);
  router = inject(Router);

  resetError() {
    setTimeout(() => {
      this.error = "";
    }, 8000);
  }

  resetMessage() {
    setTimeout(() => {
      this.message = "";
    }, 8000);
  }

  async onOtp() {
    if (!this.utilService.isEmail(this.email)) {
      this.error = "Invalid Email!";
      this.resetError();
      return;
    }

    this.isLoading = true;
    try {
      const response = await this.authService.sendOtp(this.email);
      if (response) {
        this.message = "OTP Sent Successfully!";
        this.resetMessage();
        this.showOtpInput = true;
      } else {
        this.error = this.authService.error;
        this.resetError();
      }
    } finally {
      this.isLoading = false;
    }
  }

  onOtpDigitInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    // Move to next input if current is filled
    if (value.length === 1 && index < this.otpDigits.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    // Move to previous input on backspace
    else if (value.length === 0 && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (pastedData) {
      const digits = pastedData.slice(0, 6).split('');
      this.otpDigits = [...digits, ...new Array(6 - digits.length).fill('')];
    }
  }

  async onLogin() {
    const otp = this.otpDigits.join('');
    if (otp.length !== 6) {
      this.error = "Please enter complete OTP";
      this.resetError();
      return;
    }

    this.isLoading = true;
    try {
      const response = await this.authService.loginUser(this.email, otp);
      if (response) {
        this.router.navigate(['/']);
      } else {
        this.error = this.authService.error;
        this.resetError();
      }
    } finally {
      this.isLoading = false;
    }
  }
}
