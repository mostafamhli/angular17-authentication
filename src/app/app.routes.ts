import { Route } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { BlogComponent } from './blog/blog/blog.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const APP_ROUTE: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogComponent, canActivate: [authGuard] },
];
