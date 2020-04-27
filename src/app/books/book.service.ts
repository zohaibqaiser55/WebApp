import {Injectable} from '@angular/core'
import { HttpClient } from "@angular/common/http";
import { Subject} from 'rxjs'

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

 //getting the value from the server
 getPosts(){
  //specifying that which type of data we wil get 
  this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/book')
   //passing the argument
  .subscribe((postData) => {
  this.posts = postData.posts;
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
    this.http.post<{message: string}>('http://localhost:3000/api/book', post)
      .subscribe((resData) =>{
      //Displaying the Data in console log
      console.log(resData.message);
      //we will push the new post in the local variabl only if the above above request works
      //only if the above post request works
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        });
    //after posting it will add the new value(post) in the array [...this.posts])
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}