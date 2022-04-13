import { Injectable } from '@angular/core';
import { environment } from "@environment";
import { levels } from "@config";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = new WebSocket(environment.socketUrl);

  constructor() {
    this.socket.onopen = () => {
      this.socket.send('help')
      this.socket.send('new 4')
      this.socket.send('map')
    }
  }

  public createNewGame(level: levels): void {
    this.socket.send(`new ${level}`);
    this.socket.onmessage = (event) => {
      console.log(event.data)
    }
  }

  public openXYCell(x: number, y: number): void {
    this.socket.send(`open ${x} ${y}`);
    this.socket.onmessage = (event) => {
      console.log(event.data)
    }
  }

  public getMap(): any {
    let map: any;
    this.socket.send('map');
    this.socket.onmessage = (event) => {
      map = event.data;
    }
    return map;
  }
}
