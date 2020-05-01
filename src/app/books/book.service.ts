import {Injectable} from '@angular/core'
import { HttpClient } from "@angular/common/http";
import { Subject} from 'rxjs'
import { map } from 'rxjs/operators';

import{Post} from './post.model';


//make one instance of post.service at root level that is avaliable for whole
@Injectable ({providedIn: 'root'})
export class PostsService{
//a private array(real array )
 private  posts: Post [] =[];
 //creating subject as a private property // will be used to pass the posts(book data)
 private postsUpdated = new Subject<Post[]>();

  //injecting http client functionality through constructor
 constructor(private http: HttpClient) {}

 //getting the data from the server
 getPosts(){
  //specifying that which type of data we wil get 
  this.http.get<{message: string, posts: any}>('http://localhost:3000/api/book')
  .pipe(map((postData) => {
    return postData.posts.map(post => {
      return {
        title: post.title,
        content: post.content,
        id: post._id
      };
    });
  }))
   //passing the argument
   .subscribe(transformedPosts => {
    this.posts = transformedPosts;
    this.postsUpdated.next([...this.posts]);
  });
}

 getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

 //method for adding new posts (book data)
  addPost(title: string, content: string) {
    //new variable of type, Post
    const post: Post = {id: null, title: title, content: content};
    this.http
    .post<{message: string, postId: string }>('http://localhost:3000/api/book', post)
    .subscribe((resData) => {
      const id = resData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/book/" + postId)
    .subscribe(() => {
      //it will update the front end
      const refreshList = this.posts.filter(post => post.id !== postId);
      this.posts = refreshList;
      this.postsUpdated.next([...this.posts]);
    });
}
}