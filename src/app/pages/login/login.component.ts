import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../Models/LoginUser';
import {AuthService} from '../../services/auth.service';
import {AuthResponse} from '../../Models/AuthResponse';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { LoginResponse, FacebookService,LoginOptions } from 'ngx-facebook';
import {ToastrService} from "ngx-toastr/index";
import {GoogleService} from "../../services/GoogleService";
import {AuthGoogleService} from "../../services/AuthGoogleService";

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
              private facebookService:FacebookService,
              private toastrService:ToastrService,
              private googleService:GoogleService,
              private authGoogleService:AuthGoogleService) {
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
        this.saveFacebookCredentials();
      })
      .catch((error:any) => console.log(error));

  }

  signInWithGoogle():void {
    this.googleService.signIn()
      .then(()=> {
        let currentUser = this.googleService.auth2.currentUser.get();
        let basicProfile = currentUser.getBasicProfile();
        let authResponse = currentUser.getAuthResponse();
        let requestBody = {
          id: basicProfile.getId(),
          firstName: basicProfile.getGivenName(),
          lastName: basicProfile.getFamilyName(),
          email: basicProfile.getEmail(),
          accessToken: authResponse.access_token
        };
        this.authGoogleService.save(requestBody)
          .then((response:AuthResponse)=> {
            this.authService.saveToLocalStorage(response);
            this.router.navigate(['/'])
          })
          .then(()=> {
            this.toastrService.info('Кош келиңиз!');
          })
          .catch(()=> {
            this.toastrService.error('Катталуу үзгүлтүккө учурады. Кайрадан аракет кылып көрүңүз.')
          });
      });
  }

  saveFacebookCredentials() {
    this.facebookService.api("/me?fields=id,name,email")
      .then((response)=> {
        let requestBody = this.prepareFacebookData(response);
        this.authService.loginWithFacebook(requestBody)
          .then((response:AuthResponse) => {
            this.authService.saveToLocalStorage(response);
            this.router.navigate(['/']);
          })
          .then(()=> {
            this.toastrService.info('Кош келиңиз!');

          })
          .catch((error)=> {
            console.log(error);
            this.toastrService.error('Катталуу үзгүлтүккө учурады. Кайрадан аракет кылып көрүңүз.');
          });
      });
  }

  prepareFacebookData(apiResponse) {
    let authResponse = this.facebookService.getAuthResponse();
    return {
      email: apiResponse.email,
      firstName: apiResponse.name,
      lastName: apiResponse.name,
      accessToken: authResponse.accessToken,
      id: authResponse.userID
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
        this.toastrService.info('Кош келиңиз');
        this.router.navigate(['/']);
      })
      .catch((error:Response)=> {
        this.errorOccurred = true;
      });
  }

}
