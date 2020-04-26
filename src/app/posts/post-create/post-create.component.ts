import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})
export class PostCreateComponent {

    enteredValue ='';
    newPost = 'No Content';
    //A fuction that will learn when someone click the button in html file(action)
    onAddPost(postInput: HTMLTextAreaElement){
        this.newPost = this.enteredValue;
    }
}