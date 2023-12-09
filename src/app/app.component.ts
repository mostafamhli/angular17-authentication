import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { CurrentUserService } from './auth/current-user.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private currentUser: CurrentUserService) {}

  ngOnInit() {
    setTimeout(() => {
      this.currentUser.setCurrentUser();
    }, 2000);
  }
}
