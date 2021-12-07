import {Component, OnInit} from '@angular/core';
import {BlogsService} from "../services/blogs.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {IBlog} from "../interfaces/blog.interface";

@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.component.html',
  styleUrls: ['./show-blog.component.scss']
})
export class ShowBlogComponent implements OnInit {
  blog$: Observable<IBlog>;

  constructor(private route: ActivatedRoute,
              private blogsService: BlogsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.blog$ = this.blogsService.getItem(params['id']);
    });
  }

  onNavigate(component: string, id: number) {
    this.blogsService.onNavigate(component, id);
  }

}
