import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ShowBlogComponent } from './show-blog/show-blog.component';

const routes: Routes = [
  {path: '', component: BlogsComponent, pathMatch: 'full'},
  {path: 'edit-blog/:id', component: EditBlogComponent, pathMatch: 'full'},
  {path: 'show-blog/:id', component: ShowBlogComponent, pathMatch: 'full'},
  {path: 'create-blog', component: CreateBlogComponent, pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    EditBlogComponent,
    CreateBlogComponent,
    ShowBlogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
