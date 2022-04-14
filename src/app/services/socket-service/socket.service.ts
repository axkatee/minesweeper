import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '@environment';
import { Level } from '@config';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socketMessage$ = new Subject();
  private socket = new WebSocket(environment.socketUrl);

  constructor() {
    this.socket.onopen = () => {
      this.socket.send('help');
    }

    this.socket.onmessage = (event) => {
      this.socketMessage$.next(event.data);
    }
  }

  public createNewGame(level: Level): void {
    this.socket.send(`new ${level}`);
  }

  public openXYCell(x: number, y: number): void {
    this.socket.send(`open ${x} ${y}`);
  }

  public requestMap(): void {
    this.socket.send('map');
  }
}
