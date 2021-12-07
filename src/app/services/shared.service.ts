import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  subject = new BehaviorSubject([]);

  on(value: any) {
    this.subject.next(value);
  }

  broadcast(): any {
    return this.subject.asObservable();
  }
}
