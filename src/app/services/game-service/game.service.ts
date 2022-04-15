import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  of,
  timer
} from 'rxjs';
import {
  AcceptedCells,
  Cell,
  defaultLevel, GameEventMessages, IRowsColumnsAndFlagsMap,
  Level, LocalStorageKey,
  startTime
} from '@config';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public level: Level = defaultLevel;
  public isGameStarted = new BehaviorSubject(false);
  public timer$ = of(startTime);
  public recordTime: string;

  constructor() {
  }

  public updateRecordTime(userTime: string): void {
    let recordTime = this.recordTime;
    let currentTime = userTime;
    recordTime = recordTime.replace(/:/gi, '');
    currentTime = currentTime.replace(/:/gi, '');

    if (+currentTime <= +recordTime) {
      this.recordTime = userTime;
      localStorage.setItem(LocalStorageKey.current_record, userTime);
    }
  }

  public getRowsAndColumns(map: string): IRowsColumnsAndFlagsMap {
    const convertedMap = this.getConvertedMap(map);
    let x = 0;
    let y = 0;

    convertedMap.forEach(cell => {
      cell === '\n' ? y += 1 : x += 1;
    });

    const flagsMap = new Array(x).fill(false);
    x = x / y;
    const countOfRows = Array(x);
    const countOfColumns = Array(y);

    return { countOfRows, countOfColumns, flagsMap };
  }

  public setArrayOfCellValues(countOfRows: number, countOfColumns: number, flagsMap: boolean[], map: string): AcceptedCells[] {
    let convertedMap = this.getConvertedMap(map);
    convertedMap = convertedMap.filter(cell => cell !== '\n');

    let finalArr = [];
    for(let i = 0; i < countOfRows; i++) {
      finalArr[i] = [];
      for(let j = 0; j < countOfColumns; j++) {
        const index = (j * countOfRows) + i;
        finalArr[i][j] = convertedMap[index];
        if (convertedMap[index] === Cell.unopened && flagsMap[index]) {
          finalArr[i][j] = Cell.flag;
        }
      }
    }
    return finalArr;
  }

  public onWinGame(userTime: string): void {
    this.stopTimer();
    if (!this.recordTime) {
      this.recordTime = userTime;
    }
    this.updateRecordTime(userTime)
    alert(
      GameEventMessages.playerWon + ' '
      + GameEventMessages.playerTime + ' '
      + userTime + ' '
      + GameEventMessages.recordTime + ' '
      + this.recordTime
    );
    this.exitGame();
  }

  public onLoseGame(): void {
    alert(GameEventMessages.playerLose);
    this.exitGame();
  }

  public exitGame(): void {
    this.stopTimer();
    this.isGameStarted.next(false);
  }

  public startTimer(): void {
    this.timer$ = timer(0, 1000).pipe(
      map((time) => {
        return this.getDisplayTimer(time);
      })
    );
  }

  public stopTimer(): void {
    this.timer$ = of(startTime);
  }

  private getDisplayTimer(time: number): string {
    const date = new Date(time * 1000);
    return date.toISOString().split("T")[1].split(".")[0];
  }

  private getConvertedMap(map: string): string[] {
    let convertedMap: string = map;
    convertedMap = convertedMap.replace('map:\n', '');
    convertedMap = convertedMap.replace(/□/gi, Cell.unopened);
    return Array.from(convertedMap);
  }
}
