import { Injectable, signal } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //udefined => initial value
  //null => unauthorized
  currentUserSig = signal<User | undefined | null>(undefined);
  constructor() {}
}
