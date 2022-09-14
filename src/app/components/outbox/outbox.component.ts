import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent implements OnInit {
  
  page = 1;
  sort = 'date';
  Message:any = [];
  constructor(private apiService: ApiService) { 
    this.outbox(1, 'date');
  }
  ngOnInit() {}
  outbox(page, sort){
    if(page < 1){
      page = 1;
      this.page = 1;
    }
    this.apiService.outbox(this.apiService.user.email, page, sort).subscribe((data) => { // GIVE THE USERNAME INSIDE INBOX()
      this.Message = data;
    })    
  }
  deleteMessage(message, index) {
    this.apiService.deleteMessage(message._id).subscribe((data) => {
          this.Message.splice(index, 1);
        }
      )
  }

}