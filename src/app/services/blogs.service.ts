import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, Subject, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {IBlog} from "../interfaces/blog.interface";

@Injectable({
  providedIn: 'root'
})

export class BlogsService {
  items: any;
  url: string = 'https://ror-backend-angular-13.herokuapp.com/blogs';
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private location: Location) {
  }

  getItems() {
    return this.http.get(`${this.url}.json`);
  }

  getItem(id: number): Observable<IBlog> {
    return this.http.get<IBlog>(`${this.url}/${id}.json`);
  }

  deleteItem(id: number, body: any) {
    return this.http.delete(`${this.url}/${id}`, body.toString())
      .pipe(
        //TODO: fix api response
        catchError(err => of(err))
      );
  }

  updateItem(body: any, id: any) {
    return this.http
      .put(`${this.url}/${id}`, body.toString(), this.options)
      .pipe(
        //TODO: fix api response
        catchError(err => of(err))
      )
  }

  createItem(body: any) {
    return this.http
      .post(`${this.url}/`, body.toString(), this.options)
      .pipe(
        catchError(err => of(err))
      )
  }

  //TODO: Navigation($state.go)
  onNavigate(component: string, id?: number) {
    switch (component) {
      case 'back':
        this.location.back();
        break;
      case 'create':
        this.router.navigate([`${component}-blog`]);
        break;
      case 'edit':
      case 'show':
        this.router.navigate([`${component}-blog`, id]);
        break;
      default:
        break;
    }
  }
}
