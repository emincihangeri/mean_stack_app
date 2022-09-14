import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
 
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authToken: any;
  user: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  createUser(user){
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/api/create-user', user, {headers: headers})
    .pipe(map((res:any) => res.json));
  }

}
