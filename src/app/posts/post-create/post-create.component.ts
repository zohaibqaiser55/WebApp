import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';


import { PostsService } from "../post.service";


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

  onAddPost(from: NgForm) {
    //some basic HTML validations
    if (from.invalid) {
      return;
    }
   
    this.postsService.addPost(from.value.title, from.value.content)
  }
}
