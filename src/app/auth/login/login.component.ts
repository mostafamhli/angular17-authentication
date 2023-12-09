import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {}
  onSubmit() {
    this.http
      .post<{ user: User }>('https://api.realworld.io/api/users/login', {
        user: this.form.getRawValue(),
      })
      .subscribe(
        (res) => {
          localStorage.setItem('token', JSON.stringify(res.user));
          this.auth.currentUserSig.set(res.user);
          this.router.navigate(['/']);
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

  goToRegisterPage() {
    this.router.navigateByUrl('/register');
  }
}
