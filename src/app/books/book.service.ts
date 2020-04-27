import{Post} from './post.model';
import {Injectable} from '@angular/core'
import { Subject} from 'rxjs'

//make one instance of post.service at root level that is avaliable for whole
@Injectable ({providedIn: 'root'})
export class PostsService{
//a private array(real array )
 private  posts: Post [] =[];
 //creating subject as a private property // will be used to pass the posts
 private postsUpdated = new Subject<Post[]>();

 //getting the value of the real array
 getPosts(){
     //creating a new array with old objects
     //even if i did change the value it will not efect the real array 
     return [...this.posts];
 }
 
 getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

//method for adding new post
 addPost(title: string, content: string) {
     //new variable of type, Post
    const post: Post = {id: null, title: title, content: content};
    //after posting it will add the new value(post) in the array [...this.posts])
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}