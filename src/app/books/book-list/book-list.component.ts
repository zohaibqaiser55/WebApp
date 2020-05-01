import { Component,OnInit, OnDestroy } from "@angular/core";
import { Post} from "../post.model";
import { PostsService} from "../book.service"
import { Subscription } from 'rxjs';

//components for handing(using) the class
@Component({
  selector: "app-post-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"]
})
export class BookListComponent implements OnInit,OnDestroy {
  

  posts: Post[]= [];
  private postsSub: Subscription;
  

  // will be used to updated the list (through update method in book.service)
  constructor(public postsService :PostsService){}

   ngOnInit() {
    //will fetch all the hosts
    this.postsService.getPosts();
    this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  //Method to delete the Book post by using the ID of the post 
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  //this will be called when ever the above method(components) end to avoid the memory breach
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  
}
