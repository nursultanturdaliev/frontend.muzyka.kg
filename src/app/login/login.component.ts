import { Component, OnInit } from '@angular/core';
import {LoginUser} from "../Models/LoginUser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginUser = new LoginUser('', '');

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    
  }

}
