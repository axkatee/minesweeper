import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth-service/auth.service';
import { GameService } from '@service/game-service/game.service';
import {
  defaultLevel,
  Path
} from '@config';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.less']
})
export class MinesweeperComponent {
  public isGameStarted = this.gameService.isGameStarted;

  constructor(
    private readonly router: Router,
    private readonly gameService: GameService,
    private readonly authService: AuthService
  ) { }

  public logOut(): void {
    this.authService.clearLocalStorage();

    this.gameService.isGameStarted.next(false);
    this.gameService.stopTimer();
    this.gameService.recordTime = null;
    this.gameService.level = defaultLevel;

    this.router.navigate([Path.start]);
  }

}
