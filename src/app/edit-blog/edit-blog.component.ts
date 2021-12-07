import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BlogsService} from "../services/blogs.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit, OnDestroy {
  id: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private blogsService: BlogsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      //TODO: use take/until, unsubscribe
      return this.blogsService.getItem(this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(item => {
          this.editForm = new FormGroup({
            title: new FormControl(item.title),
            content: new FormControl(item.content),
          });
        });
    });
  }

  onSubmit() {
    let body = new URLSearchParams();
    body.set('id', this.id);
    body.set('blog[title]', this.editForm.value.title);
    body.set('blog[content]', this.editForm.value.content);
    this.blogsService.updateItem(body, this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.onNavigate('show');
        }
      );
  }

  onNavigate(component: string) {
    this.blogsService.onNavigate(component, this.id)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  };
}
