import {Injectable} from "@angular/core";
import {filter, map, Observable, Subject} from "rxjs";
import {BroadcastEvent} from "../interfaces/broadcast.event";

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  _eventBus: Subject<BroadcastEvent> = new Subject<BroadcastEvent>();

  constructor() {
  }

  broadcast(key: any, data?: any) {
    this._eventBus.next({key, data});
  }

  on(key: any): Observable<any> {
    return this._eventBus.asObservable().pipe(
      filter(event => event.key === key),
      map(event => event.data)
    )
  }
}
