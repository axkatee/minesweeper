import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  takeUntil
} from 'rxjs';
import { SocketService } from '@service/socket-service/socket.service';
import { GameService } from '@service/game-service/game.service';
import {
  Cell,
  SocketMessage,
  startTime
} from '@config';

@Component({
  selector: 'app-play-field',
  templateUrl: './play-field.component.html',
  styleUrls: ['./play-field.component.less']
})
export class PlayFieldComponent implements OnInit, OnDestroy {
  public map$ = new BehaviorSubject<string>(null);
  public countOfRows = [];
  public countOfColumns = [];
  public valuesMap: any[];
  public flagsMap: boolean[];
  public currentTime = startTime;

  private isMapInit = false;
  private destroy$ = new Subject<boolean>();

  constructor(
    private readonly gameService: GameService,
    private readonly socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.socketService.requestMap();
    this.handleSocketResponse();
    this.gameService.startTimer();
    this.handleTimer();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  public handleSocketResponse(): void {
    this.socketService.socketMessage$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe((res: string) => {
        this.handleResponse(res);
    });
  }

  public openCell(x: number, y: number): void {
    if (this.valuesMap[x][y] === Cell.unopened) {
      this.socketService.openXYCell(x, y);
      this.socketService.requestMap();
    }
  }

  public putFlag(event: Event, x: number, y: number): void {
    event.preventDefault();
    const flagIndex = (y * this.countOfRows.length) + x;
    this.flagsMap[flagIndex] = !this.flagsMap[flagIndex];
    this.valuesMap = this.gameService.setArrayOfCellValues(
      this.countOfRows.length,
      this.countOfColumns.length,
      this.flagsMap,
      this.map$.getValue()
    );
  }

  public exitGame(): void {
    this.gameService.exitGame();
  }

  private handleTimer(): void {
    this.gameService.timer$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((time) => {
        this.currentTime = time;
      });
  }

  private handleResponse(res: string): void {
    if (res?.includes(SocketMessage.map)) {
      if (!res?.includes(Cell.square)) {
        this.gameService.onWinGame(this.currentTime);
      } else {
        this.drawMap(res);
      }
    } else if (res?.includes(SocketMessage.loseGame)) {
      this.gameService.onLoseGame();
    }
  }

  private drawMap(res: string): void {
    this.map$.next(res);
    if (!this.isMapInit) {
      const rowsColumnsAndFlagsMapObj = this.gameService.getRowsAndColumns(this.map$.getValue());
      this.countOfRows = rowsColumnsAndFlagsMapObj.countOfRows;
      this.countOfColumns = rowsColumnsAndFlagsMapObj.countOfColumns;
      this.flagsMap = rowsColumnsAndFlagsMapObj.flagsMap;
      this.isMapInit = true;
    }
    this.valuesMap = this.gameService.setArrayOfCellValues(
      this.countOfRows.length,
      this.countOfColumns.length,
      this.flagsMap,
      this.map$.getValue()
    );
  }
}
