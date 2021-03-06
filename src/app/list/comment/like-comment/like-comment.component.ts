import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import * as $ from 'jquery';

@Component({
  selector: 'app-like-comment',
  templateUrl: './like-comment.component.html',
  styleUrls: ['./like-comment.component.css']
})
export class LikeCommentComponent implements OnInit {
  @Input() likes :any=[];
  @Input() ID :any;
  @Output() addLike : EventEmitter<any> = new EventEmitter();
  @Output() removeLike : EventEmitter<any> = new EventEmitter();
  noOfLikes:Number;
  currentClass:any={'btn':true, 'btn-light':true, 'btn-xs':true, 'colorRed':true, 'colorBlack':false};
  styleValue:string="hidden";
  


  constructor(private _cookieService : CookieService) {  }

  

  ngOnInit() {
    console.log(this.likes,"In like component");
    this.noOfLikes = this.likes.length;
    if(this.noOfLikes!=0){
      for(var i=0;i<this.noOfLikes;i++){
        if(this.likes[i].likedBy==this._cookieService.get("thisUser")){
          this.currentClass={'btn':true, 'btn-light':true, 'btn-xs':true, 'colorRed':true, 'colorBlack':false};
          break;  
        }else{
          this.currentClass={'btn':true, 'btn-light':true, 'btn-xs':true, 'colorRed':false, 'colorBlack':true};
        }
      }
    }else{
      this.currentClass={'btn':true, 'btn-light':true, 'btn-xs':true, 'colorRed':false, 'colorBlack':true};
    }
  }

  likeFn(){
    for(var i=0;i<this.noOfLikes;i++){
      if(this.likes[i].likedBy==this._cookieService.get("thisUser")){
        this.currentClass={'btn':true, 'btn-light':true, 'btn-xs':true, 'colorRed':false, 'colorBlack':true};
        return this.removeLike.emit({"ID":this.ID})
      }
    }
    this.currentClass={'btn':true, 'btn-light':true, 'btn-xs':true, 'colorRed':true, 'colorBlack':false};
    return this.addLike.emit({"ID":this.ID});
  }

  mouseEnter(){
    this.styleValue="visible";
  }
  mouseLeave(){
    this.styleValue="hidden";
  }

}
