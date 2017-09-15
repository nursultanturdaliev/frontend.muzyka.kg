import {Injectable } from '@angular/core';
import {LoginUser} from "../Models/LoginUser";
import {Http, URLSearchParams} from "@angular/http";
import {ConfigService} from "./config.service";
import {AuthResponse} from "../Models/AuthResponse";
import {BaseService} from "./BaseService";
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class AuthService extends BaseService {

  constructor(private http:Http, private configService:ConfigService) {
    super();
  }

  public login(email:string, password:string) {
    let body = new URLSearchParams();
    body.append('email', email);
    body.append('password', password);
    return this.http.post(this.configService.URL + '/login', body)
      .toPromise()
      .then(response => response.json() as AuthResponse);
  }

  public register(firstName:string, lastName:string, email:string, password:string) {
    let body = new URLSearchParams();
    body.append('firstName', firstName);
    body.append('lastName', lastName);
    body.append('email', email);
    body.append('password', password);

    return this.http.post(this.configService.URL + '/register', body)
      .toPromise()
      .then(response => response.json() as AuthResponse);
  }

  public loginWithFacebook(requestBody) {
    return this.http.post(this.configService.API_URL + '/oauth/login/facebook', requestBody)
      .toPromise()
      .then(response => response.json() as AuthResponse);
  }

  public saveToLocalStorage(authResponse):void {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('refresh_token', authResponse.refresh_token);
    localStorage.setItem('email', authResponse.user);
    localStorage.setItem('first_name', authResponse.first_name);
    localStorage.setItem('last_name', authResponse.last_name);
    localStorage.setItem('photo', authResponse.photo);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.clear();
  }

  public userName() {
      if( localStorage.getItem('first_name') || localStorage.getItem('last_name') ){
          return (localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name'));
      }
    return localStorage.getItem('email');
  }

  public userPhoto() {
      if ( localStorage.getItem('photo') != 'null' ){
          return this.configService.URL + '/uploads/users/' + localStorage.getItem('photo');
      }
    return this.configService.URL + '/uploads/users/profile.png';
  }
}
