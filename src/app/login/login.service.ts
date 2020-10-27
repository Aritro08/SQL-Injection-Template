import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({'providedIn': 'root'})

export class LoginService{

  message: string;
  messageSub = new Subject<string>();

  constructor(private http: HttpClient) {}

  onLogin(username: string, password: string) {
    this.http.post<{message: string}>("http://localhost:3000/login", {username: username, password: password}).subscribe(res => {
      this.message = res.message;
      this.messageSub.next(this.message);
    });
  }

  onSignUp(username: string, password: string) {
    this.http.post<{message: string}>("http://localhost:3000/sign-up", {username: username, password: password}).subscribe(res => {
      this.message = res.message;
      this.messageSub.next(this.message);
    });
  }

}
