import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth-service/auth.service';
import {
  maxInputLength,
  Path
} from '@config';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less']
})
export class StartPageComponent {
  public name: string;
  public readonly maxInputLength = maxInputLength;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    if (this.authService.isLoggedIn) {
      this.authService.clearLocalStorage();
    }
  }

  public navigateToGame(): void {
    if (this.name?.trim()) {
      this.authService.setNameToLocalStorage(this.name);
      this.router.navigate([Path.main]);
    }
  }
}
