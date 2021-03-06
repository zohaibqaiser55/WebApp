//I have used the code avaliable on CCT MOODEL [by : Mikhail Timofeev]
//Angular & NodeJS - The MEAN Stack Guide [online Courese on Udemy]
//link to that Course is [https://www.udemy.com/share/101WISB0QZclxTR34=/]
//This project is submitted by: Zohaib Qaiser[2017400]

import {Injectable} from '@angular/core'
import { HttpClient } from "@angular/common/http";
import { Subject} from 'rxjs'
import { map } from 'rxjs/operators';
//local import
import{Post} from './post.model';

const G_url="http://localhost:3000/api/book";

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
  this.http.get<{message: string, posts: any}>(G_url)
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

//will search for the Review/post id that we want to edit/update
getPost(id: string) {
  return this.http.get<{ _id: string; title: string; content: string }>(
    G_url+"/" + id
  );
}


 //method for adding new posts (book data)
  addPost(title: string, content: string) {
    //new variable of type, Post
    const post: Post = {id: null, title: title, content: content};
    this.http
    .post<{message: string, postId: string }>(G_url, post)
    .subscribe((resData) => {
      const id = resData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
  
  //update the exsistence review
  updateReview(id: string, title: string, content: string) {
    const book: Post = { id: id, title: title, content: content };
    this.http
      .put(G_url+"/" + id, book)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === book.id);
        updatedPosts[oldPostIndex] = book;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        //this.router.navigate(["/"]);
      });
    }

  //method to delete the review
  deletePost(postId: string) {
    this.http.delete(G_url+"/" + postId)
    .subscribe(() => {
      //it will update the front end
      const refreshList = this.posts.filter(post => post.id !== postId);
      this.posts = refreshList;
      this.postsUpdated.next([...this.posts]);
    });
}
}