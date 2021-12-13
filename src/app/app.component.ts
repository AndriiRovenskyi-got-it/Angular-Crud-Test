import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "./services/web-socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-crud-test';

  constructor(private webSocketService: WebSocketService) {
    //TODO: connect sockets
    this.webSocketService.connect();
  }

  ngOnInit() {
  }
}
