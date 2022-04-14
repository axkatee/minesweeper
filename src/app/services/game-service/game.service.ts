import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultLevel, Level } from '@config';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public level: Level = defaultLevel;
  public isGameStarted = new BehaviorSubject(false);

  constructor() { }
}
