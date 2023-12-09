import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.http
      .post<{ user: User }>('https://api.realworld.io/api/users', {
        user: this.form.getRawValue(),
      })
      .subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', JSON.stringify(res.user));
          this.auth.currentUserSig.set(res.user);
          this.router.navigateByUrl('/');
        },
        (err) => {
          this.snackBar.open(
            this.convertObjectToString([err.error.errors][0]),
            'Close',
            {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 1000,
            }
          );
        }
      );
  }

  convertObjectToString(obj: any) {
    return Object.entries(obj)
      .map(([key, value]) => `${key} ${value}`)
      .join(' ');
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
