import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  cssClass = 'row';
  link!:string;
  title!:string;
  votes!:number;

  constructor() {
    this.link = 'testeLink';
    this.title = 'teste title';
    this.votes = 0;
   }

  ngOnInit(): void {
  }

  voteUp(){
    this.votes++;
  }

  voteDown(){
    this.votes--;
  }

}
