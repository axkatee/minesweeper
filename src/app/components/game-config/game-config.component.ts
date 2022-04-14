import { Component, EventEmitter, Output } from '@angular/core';
import { SocketService } from '@service/socket-service/socket.service';
import { defaultLevel, IGameConfig, Level } from '@config';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.less']
})
export class GameConfigComponent {
  @Output() gameState = new EventEmitter();

  public level: Level = defaultLevel;

  constructor(
    private readonly socketService: SocketService
  ) { }

  public startGame(): void {
    const gameConfig: IGameConfig = { isStarted: true, level: this.level };
    this.socketService.createNewGame(this.level);
    this.gameState.emit(gameConfig);
  }

}


