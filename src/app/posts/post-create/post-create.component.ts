import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';


import { PostsService } from "../post.service";
import { format } from 'path';


@Component({
  //paths to the file (components)
  selector: "app-post-create",
  //template of the post view
  templateUrl: "./post-create.component.html",
  //styling shit for the above HTML file
  styleUrls: ["./post-create.component.css"]
})

export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";
  

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    //some basic html validation
    if (form.invalid) {
      return;
    }
    //add the posts
    this.postsService.addPost(form.value.title, form.value.content);
    //reset the post tempelate for the next post
    form.resetForm();
  }
}
