import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../Models/LoginUser';
import {AuthService} from '../../services/auth.service';
import {AuthResponse} from '../../Models/AuthResponse';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { LoginResponse, FacebookService,LoginOptions } from 'ngx-facebook';
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
              private router:Router,
              private facebookService:FacebookService) {
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

  loginWithFacebook():void {
    const options:LoginOptions = {
      scope: 'public_profile,email',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.facebookService.login(options)
      .then((response:LoginResponse) => {
        console.log(response);
        this.saveFacebookCredentials();
      })
      .catch((error:any) => console.error(error));

  }

  saveFacebookCredentials() {
    this.facebookService.api("/me?fields=id,name,email")
      .then((response)=> {
        let requestBody = this.prepareFacebookData(response);
        this.authService.loginWithFacebook(requestBody);
      });
  }

  prepareFacebookData(apiResponse) {
    let authResponse = this.facebookService.getAuthResponse();
    return {
      email: apiResponse.email,
      name: apiResponse.name,
      accessToken: authResponse.accessToken,
      facebookId: authResponse.userID
    }
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
