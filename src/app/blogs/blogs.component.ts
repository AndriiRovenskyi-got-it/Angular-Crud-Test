import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogsService} from "../services/blogs.service";
import {SharedService} from "../services/shared.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  blogs$: any;

  constructor(private blogsService: BlogsService, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.blogsService.getItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(blogs => {
        // TODO: on
        this.sharedService.on('sharedBlogs')
          .pipe(takeUntil(this.destroy$))
          .subscribe(message => {
            this.blogs$ = message;
          });
        // TODO: broadcast
        this.sharedService.broadcast('sharedBlogs', blogs);
      })
  }

  onNavigate(component: string, itemId: number) {
    this.blogsService.onNavigate(component, itemId);
  }

  onDelete(itemId: any) {
    let body = new URLSearchParams();
    body.set('id', itemId);
    this.blogsService.deleteItem(itemId, body)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
