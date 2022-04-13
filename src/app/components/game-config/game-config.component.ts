import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { defaultLevel, IGameConfig, levels } from '@config';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.less']
})
export class GameConfigComponent implements OnInit {
  @Output() gameState = new EventEmitter();

  public level: number = defaultLevel;

  constructor() { }

  ngOnInit(): void {
  }

  public startGame(): void {
    const gameConfig: IGameConfig = { isStarted: true, level: this.level as levels };
    this.gameState.emit(gameConfig);
  }

}
