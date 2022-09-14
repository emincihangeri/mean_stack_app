import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  authToken: any;
  user: any;
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  // Send Message
  sendMessage(data): Observable<any> {
    const date = new Date();
    let req = {
      sender: this.user.email,
      receiver: data.email,
      text: data.message,
      date: date
    }
    this.loadToken();
    let header = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
    let url = `${this.baseUri}/send`;
    return this.http.post(url, req, { headers: header }).pipe(catchError(this.errorMgmt));
  }

   // Delete message
  deleteMessage(id): Observable<any> {
    this.loadToken();
    let header = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
      let url = `${this.baseUri}/delete-message/${id}`;
      return this.http
        .delete(url, { headers: header })
        .pipe(catchError(this.errorMgmt));
  }

  // Get inbox messages
  inbox(email, page, sort) {
    this.loadToken();
    let header = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUri}/inbox/${email}/${page}/${sort}`, { headers: header });
  }

  // Get outbox messages
  outbox(email, page, sort) {
    this.loadToken();
    let header = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUri}/outbox/${email}/${page}/${sort}`, { headers: header });
  }



  //Authenticate
  authenticateUser(user){
    return this.http.post('http://localhost:4000/api/authenticate', user, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  //Store User Data
  storeUserData(authToken, user){
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = authToken;
    this.user = user;
  }
  loadToken(){
    const token = localStorage.getItem("token");
    this.authToken = token;
    const user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
  
  }

  isAdmin(){
    this.user =  JSON.parse(localStorage.getItem("user"));
    if(!this.user){
      return false;
    }
    return this.user.designation === "Admin";
  }

  //Logout
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    return this.jwtHelper.isTokenExpired();
  }

  // Create
  createUser(user): Observable<any> {
    this.loadToken();
    let header = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/api/create-user', user, {headers: header}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Get all users
  getUsers(page, sort) {
    this.loadToken();
    let header = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUri}/${page}/${sort}`, { headers: header });
  }
  // Get user
  getUser(id): Observable<any> {
    this.loadToken();
    let header = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: header }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update user
  updateUser(id, data): Observable<any> {
    this.loadToken();
    let header = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put(url, data, { headers: header })
      .pipe(catchError(this.errorMgmt));
  }
  // Delete user
  deleteUser(id): Observable<any> {
    this.loadToken();
    let header = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete(url, { headers: header })
      .pipe(catchError(this.errorMgmt));
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}