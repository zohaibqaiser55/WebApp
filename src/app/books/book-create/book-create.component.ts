import { Component , OnInit} from "@angular/core";
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from "../book.service";
import { Post } from "../post.model";



@Component({
  //paths to the file (components)
  selector: "app-book-create",
  //template of the post view
  templateUrl: "./book-create.component.html",
  //styling shit for the above HTML file
  styleUrls: ["./book-create.component.css"]
})

export class BookCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  private mode = "create";
  private reviewId: string;
  post: Post;


  constructor(public postsService: PostsService, 
  public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      //checking if user is wrirting a new review or updating the old one
      if (paramMap.has("reviewId")) {
        this.mode = "edit";
        this.reviewId = paramMap.get("reviewId");
        this.postsService.getPost(this.reviewId).subscribe(reviewData =>{
          this.post = {id: reviewData._id, title: reviewData.title, content: reviewData.content}

        });
      } else {
        this.mode = "create";
        this.reviewId = null;
      }
    });
  }

  onSaveReview(form: NgForm) {
    //some basic html validation
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create'){
     //add the posts
     this.postsService.addPost(form.value.title, form.value.content);
    }
    else{
      //updates the review/post
      this.postsService.updateReview(this.reviewId ,form.value.title, form.value.content)
    }
   
    //reset the post tempelate for the next post
    form.resetForm();
  }
}
