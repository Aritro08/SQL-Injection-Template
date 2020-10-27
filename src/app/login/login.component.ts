import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginMode = false;
  messageSub: Subscription;
  message: string;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.messageSub = this.loginService.messageSub.subscribe(res => {
      this.message = res;
    });
  }

  onSubmit() {
    if(this.loginMode) {
      this.loginService.onLogin(this.loginForm.value.username, this.loginForm.value.password);
    } else {
      this.loginService.onSignUp(this.loginForm.value.username, this.loginForm.value.password);
    }
    this.loginForm.reset();
  }

  toggleLogin() {
    this.loginMode = !this.loginMode;
    this.loginForm.reset();
    this.message = '';
  }

}
