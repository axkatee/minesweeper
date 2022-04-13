import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service';
import { maxInputLength } from '@config';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less']
})
export class StartPageComponent {
  public name: string;
  public maxInputLength = maxInputLength;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.authService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.authService.removeNameFromLocalStorage();
      }
    });
  }

  public navigateToGame(): void {
    if (this.name?.trim()) {
      this.authService.setNameToLocalStorage(this.name);
      this.router.navigate(['main']);
    }
  }
}
