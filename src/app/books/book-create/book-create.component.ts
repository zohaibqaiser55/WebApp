import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';


import { PostsService } from "../book.service";



@Component({
  //paths to the file (components)
  selector: "app-book-create",
  //template of the post view
  templateUrl: "./book-create.component.html",
  //styling shit for the above HTML file
  styleUrls: ["./book-create.component.css"]
})

export class BookCreateComponent {
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
