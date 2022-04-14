import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth-service/auth.service';
import { GameService } from '@service/game-service/game.service';
import { defaultLevel } from '@config';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.less']
})
export class MinesweeperComponent implements OnInit {
  public isGameStarted: boolean;

  constructor(
    private readonly router: Router,
    private readonly gameService: GameService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.handleGameState();
  }

  public logOut(): void {
    this.authService.removeNameFromLocalStorage();
    this.gameService.isGameStarted.next(false);
    this.gameService.level = defaultLevel;
    this.router.navigate(['start']);
  }

  private handleGameState(): void {
    this.gameService.isGameStarted.subscribe(isStarted => {
      this.isGameStarted = isStarted;
    });
  }

}
