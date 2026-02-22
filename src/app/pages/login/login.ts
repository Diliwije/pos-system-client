import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { Cookie } from '../../services/cookie';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private authService = inject(Auth);
  private cookieService = inject(Cookie);
  private router = inject(Router);

  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  // Convenient getters for template access
  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password } = this.form.value;

    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Login successful! Redirecting...';
        this.cookieService.setToken(res.token, 'auth_token');
        setTimeout(() => this.router.navigate(['/dashboard']), 800);
      },
      error: (err) => {
        this.isLoading = false;
        const status = err?.status;
        if (status === 404) {
          this.errorMessage = 'No account found with this email.';
        } else if (status === 401) {
          this.errorMessage = 'Incorrect password. Please try again.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}
