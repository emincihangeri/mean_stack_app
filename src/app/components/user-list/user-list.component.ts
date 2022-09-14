import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  User:any = [];
  page = 1;
  sort = 'date';
  constructor(private apiService: ApiService) { 
    this.readUser(1, 'date');
  }
  ngOnInit() {}
  readUser(page, sort){
    this.apiService.getUsers(page, sort).subscribe((data) => {
     this.User = data;
    })    
  }
  removeUser(user, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteUser(user._id).subscribe((data) => {
          this.User.splice(index, 1);
        }
      )    
    }
  }
}