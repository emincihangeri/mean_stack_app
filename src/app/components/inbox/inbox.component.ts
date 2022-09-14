import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { ApiService } from './../../service/api.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  
  user: User;
  page = 1;
  sort = 'date'

  Message:any = [];
  
  constructor(private apiService: ApiService) { 
    this.inbox(1, 'date');
  }
  ngOnInit() {
  }
  inbox(page, sort){
    //this.user = this.apiService.returnUser(); // THIS MIGHT FAIL
    this.apiService.inbox(this.apiService.user.email, page, sort).subscribe((data) => { // GIVE THE USERNAME INSIDE INBOX()
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