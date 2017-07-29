import { Component, OnInit } from '@angular/core';
import {LoginUser} from "../Models/LoginUser";
import {AuthService} from "../services/auth.service";
import {AuthResponse} from "../Models/AuthResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginUser:LoginUser;
  public errorOccurred:boolean;

  constructor(private authService:AuthService) {
  }

  ngOnInit() {
    this.loginUser = new LoginUser('', '');
  }

  onSubmit() {
    this.errorOccurred = false;
    this.authService.login(this.loginUser)
      .then(authResponse=> {
        this.authService.saveToLocalStorage(authResponse);
      })
      .catch((error:Response)=> {
        this.errorOccurred = true;
      });
  }

}
