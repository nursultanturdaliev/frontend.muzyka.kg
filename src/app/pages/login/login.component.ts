import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../Models/LoginUser';
import {AuthService} from '../../services/auth.service';
import {AuthResponse} from '../../Models/AuthResponse';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginUser:LoginUser;
  public errorOccurred:boolean;

  public loginForm:FormGroup;

  constructor(private authService:AuthService,
              private formBuilder:FormBuilder,
              private router:Router) {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginUser = new LoginUser('', '');
  }

  onSubmit() {
    this.errorOccurred = false;
    this.authService.login(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
      )
      .then(authResponse=> {
        this.authService.saveToLocalStorage(authResponse);
        this.router.navigate(['/']);
      })
      .catch((error:Response)=> {
        this.errorOccurred = true;
      });
  }

}
