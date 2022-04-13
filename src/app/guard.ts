import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class Guard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['start']);
        return false;
      }
    });
  }
}
