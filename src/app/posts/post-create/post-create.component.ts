import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from '@angular/forms';

//importing the Module we created (Post.module)
import { Post} from "../post.model"

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
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(from: NgForm) {
    //some basic HTML validations
    if (from.invalid) {
      return;
    }
    const post: Post = {
      title: from.value.title,
      content: from.value.content
    };
    this.postCreated.emit(post);
  }
}
