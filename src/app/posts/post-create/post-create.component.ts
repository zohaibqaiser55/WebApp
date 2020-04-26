import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
    //A fuction that will learn when someone click the button in html file(action)
    onAddPost(){
        alert('Post created')
    }
}