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

  public register(email:string, password:string) {
    let body = new URLSearchParams();
    body.append('email', email);
    body.append('password', password);

    return this.http.post(this.configService.URL + '/register', body)
      .toPromise()
      .then(response => response.json() as AuthResponse);
  }

  public saveToLocalStorage(authResponse:AuthResponse):void {
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('refresh_token', authResponse.refresh_token);
    localStorage.setItem('email', authResponse.user);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    localStorage.clear();
  }

  public userEmail() {
    return localStorage.getItem('email');
  }
}
