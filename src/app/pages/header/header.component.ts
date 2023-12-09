import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../auth/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  auth = inject(AuthService);
  router = inject(Router);
  http = inject(HttpClient);
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('token')!)) {
      this.auth.currentUserSig.set(JSON.parse(localStorage.getItem('token')!));
    } else {
      this.auth.currentUserSig.set(null);
    }
  }

  userMenuIsOpened: boolean = false;
  openUserMenu() {
    this.userMenuIsOpened = !this.userMenuIsOpened;
  }

  mobileMenuIsOpened: boolean = false;
  openMobileMenu() {
    this.mobileMenuIsOpened = !this.mobileMenuIsOpened;
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  logout() {
    localStorage.setItem('token', '');
    this.auth.currentUserSig.set(null);
    this.router.navigateByUrl('/');
    this.userMenuIsOpened = false;
  }
}
