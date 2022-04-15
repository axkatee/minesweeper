import { Component } from '@angular/core';
import { SocketService } from '@service/socket-service/socket.service';
import { GameService } from '@service/game-service/game.service';
import {
  Level,
  LocalStorageKey
} from '@config';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.less']
})
export class GameConfigComponent {
  public level: Level;
  public lastRecord: string;

  constructor(
    private readonly gameService: GameService,
    private readonly socketService: SocketService
  ) {
    this.level = this.gameService.level;
    this.lastRecord = localStorage.getItem(LocalStorageKey.current_record) || null;
  }

  public startGame(): void {
    this.gameService.isGameStarted.next(true);
    this.gameService.level = this.level;
    this.socketService.createNewGame(this.level);
  }

}


