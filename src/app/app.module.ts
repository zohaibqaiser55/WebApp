//I have used the code avaliable on CCT MOODEL [by : Mikhail Timofeev]
//Angular & NodeJS - The MEAN Stack Guide [online Courese on Udemy]
//link to that Course is [https://www.udemy.com/share/101WISB0QZclxTR34=/]
//This project is submitted by: Zohaib Qaiser[2017400]

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule} from "@angular/common/http"


//local imports
import {BookCreateComponent} from './books/book-create/book-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HeaderComponent} from "./header/header.component"
import { BookListComponent } from './books/book-list/book-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    //declaring so can use the components that i created 
    AppComponent,
    BookCreateComponent,HeaderComponent,BookListComponent
  ],
  imports: [
    //all the material components that we import for styling the front end
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
