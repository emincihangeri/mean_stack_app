import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }
  loginSubmit(){
    const user = {
      username: this.username,
      password: this.password,
    }

    this.apiService.authenticateUser(user).subscribe((data) => {
      if((data as any).success){
        this.apiService.storeUserData((data as any).token, (data as any).user);
        console.log('Logged in!');
        this.router.navigate(['/home']);
      }
      else{
        console.log('Login failed.');
        this.router.navigate(['/home']);
      } 
    })

  }

}
