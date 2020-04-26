import { Component,OnInit, OnDestroy } from "@angular/core";
import { Post} from "../post.model";
import { PostsService} from "../post.service"
import { Subscription } from 'rxjs';

//components for handing(using) the class
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit,OnDestroy {
  

  posts: Post[]= [];
  private postsSub: Subscription;
  

  // will be used to updated the list (through update method in post.service)
  constructor(public postsService :PostsService){}

   ngOnInit() {
    //will fetch all the hosts
    this.posts = this.postsService.getPosts();
    this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });

  }
  //this will be called when ever the above method(components) end to avoid the memory breach
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  
}
