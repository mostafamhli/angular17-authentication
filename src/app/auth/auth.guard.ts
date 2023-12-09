import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from './current-user.service';
import { filter, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = inject(CurrentUserService);
  const router: Router = inject(Router);
  currentUser.setCurrentUser();
  currentUser.currentUser$.subscribe((res) => {
    console.log(res);
  });
  return currentUser.currentUser$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map((currentUser) => {
      if (!currentUser) {
        router.navigateByUrl('/login');
        return false;
      }
      return true;
    })
  );
};
