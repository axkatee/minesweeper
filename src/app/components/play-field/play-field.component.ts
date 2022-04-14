import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SocketService } from '@service/socket-service/socket.service';
import { GameService } from '@service/game-service/game.service';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.less']
})
export class PlayFieldComponent implements OnInit, OnDestroy {
  public map$ = new BehaviorSubject<string>('');
  public countOfRows = [];
  public countOfColumns = [];
  public valuesMap: string[];
  public flagsMap: boolean[];

  private isMapInit = false;
  private socketMessageSub: Subscription;

  constructor(
    private readonly gameService: GameService,
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
          if (!this.isMapInit) {
            this.getRowsAndColumns();
            this.isMapInit = true;
          }
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

  public putFlag(event: Event, x: number, y: number): void {
    event.preventDefault();
    const flagIndex = (y * this.countOfRows.length) + x;
    this.flagsMap[flagIndex] = !this.flagsMap[flagIndex];
    this.setArrayOfCellValues();
  }

  public exitGame(): void {
    this.gameService.isGameStarted.next(false);
  }

  private getRowsAndColumns(): void {
    const convertedMap = this.getConvertedMap();
    let x = 0;
    let y = 0;

    convertedMap.forEach(cell => {
      cell === '\n' ? y += 1 : x += 1;
    });

    this.flagsMap = new Array(x).fill(false);
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
        if (map[index] === 'ㅤ' && this.flagsMap[index]) {
          finalArr[i][j] = 'f';
        }
      }
    }
    this.valuesMap = finalArr;
  }

  private getConvertedMap(): string[] {
    let convertedMap: string = this.map$.getValue();
    convertedMap = convertedMap.replace('map:\n', '');
    convertedMap = convertedMap.replace(/□/gi, 'ㅤ');
    return Array.from(convertedMap);
  }

}
