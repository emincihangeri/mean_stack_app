import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meanapp';

  constructor(public apiService: ApiService, private router: Router){}
  ngOnInit(){
  }

  onLogoutClick(){
    this.apiService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
