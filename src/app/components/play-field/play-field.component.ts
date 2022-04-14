import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SocketService } from '@service/socket-service/socket.service';
import { IGameConfig } from '@config';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.less']
})
export class PlayFieldComponent implements OnInit, OnDestroy {
  @Output() gameState = new EventEmitter();

  public map$ = new BehaviorSubject<string>('');
  public countOfRows = [];
  public countOfColumns = [];
  public valuesMap: string[];

  private socketMessageSub: Subscription;

  constructor(
    private readonly socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.socketService.requestMap();
    this.handleSocketResponse();
  }

  ngOnDestroy(): void {
    this.socketMessageSub?.unsubscribe();
  }

  public handleSocketResponse(): void {
    this.socketMessageSub = this.socketService.socketMessage$.subscribe((res: string) => {
      if (res?.includes('map:')) {
        if (!res?.includes('□')) {
          alert('you win!');
          this.exitGame();
        } else {
          this.map$.next(res);
          this.getRowsAndColumns();
          this.setArrayOfCellValues();
        }
      } else if (res?.includes('open: You lose')) {
        alert('you lose');
        this.exitGame();
      }
    });
  }

  public rerenderMap(x: number, y: number): void {
    this.socketService.openXYCell(x, y);
    this.socketService.requestMap();
  }

  public exitGame(): void {
    const gameConfig: IGameConfig = { isStarted: false, level: 1 };
    this.gameState.emit(gameConfig);
  }

  private getRowsAndColumns(): void {
    const convertedMap = this.getConvertedMap();
    let x = 0;
    let y = 0;

    convertedMap.forEach(cell => {
      cell === '\n' ? y += 1 : x += 1;
    });

    x = x / y;

    this.countOfRows = Array(x);
    this.countOfColumns = Array(y);
  }

  private setArrayOfCellValues(): void {
    let map = this.getConvertedMap();
    map = map.filter(cell => cell !== '\n');

    let finalArr = [];
    for(let i = 0; i < this.countOfRows.length; i++) {
      finalArr[i] = [];
      for(let j = 0; j < this.countOfColumns.length; j++) {
        const index = (j * this.countOfRows.length) + i;
        finalArr[i][j] = map[index];
      }
    }
    this.valuesMap = finalArr;
    console.log(this.valuesMap)
  }

  private getConvertedMap(): string[] {
    let convertedMap: string = this.map$.getValue();
    convertedMap = convertedMap.replace('map:\n', '');
    convertedMap = convertedMap.replace(/□/gi, 'ㅤ');
    return Array.from(convertedMap);
  }

}
