import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth-service/auth.service';
import { IGameConfig } from '@config';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.less']
})
export class MinesweeperComponent implements OnInit {
  public gameState: IGameConfig = { isStarted: false, level: 1 };

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public handleGameState(gameState: IGameConfig): void {
    this.gameState = gameState;
  }

  public logOut(): void {
    this.authService.removeNameFromLocalStorage();
    this.router.navigate(['start']);
  }

}
