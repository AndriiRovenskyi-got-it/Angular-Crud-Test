import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogsService} from "../services/blogs.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  createForm: FormGroup;

  constructor(private blogsService: BlogsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
    });
  }

  onSubmit() {
    let body = new URLSearchParams();
    body.set('blog[title]', this.createForm.value.title);
    body.set('blog[content]', this.createForm.value.content);
    this.blogsService.createItem(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.router.navigate(['']);
        }
      );
  }

  onNavigate(component: string) {
    this.blogsService.onNavigate(component);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
