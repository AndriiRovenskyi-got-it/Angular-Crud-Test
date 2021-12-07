import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  sharedData: any;

  scanWebSocket: any;

  constructor() {
  }

  connect(): void {
    if (this.scanWebSocket) return;
    const url = 'wss://ror-backend-angular-13.herokuapp.com/websocket';
    this.scanWebSocket = new WebSocket(url);
    this.scanWebSocket.onopen = (event: any) => {
      console.log(`WS connected: ${JSON.stringify(event)}`);
      this.listenStream();
    };
  }

  close(): void {
    if (this.scanWebSocket) {
      this.scanWebSocket.close();
      this.scanWebSocket = null;
    }
  }

  private listenStream(): void {
    this.scanWebSocket.onmessage = (event: any) => {
      this.sharedData = event;
    }
  }
}
