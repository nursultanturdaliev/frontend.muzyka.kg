import {BaseService} from "./BaseService";
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ConfigService} from "./config.service";
import {AuthResponse} from "../Models/AuthResponse";
/**
 * Created by nursultan on 8/13/17.
 */

@Injectable()
export class AuthGoogleService extends BaseService {

  constructor(private http:Http, private configService:ConfigService) {
    super();
  }

  save(requestBody:any):Promise<AuthResponse> {
    return this.http.post(this.configService.API_URL + '/oauth/login/google', requestBody)
      .toPromise()
      .then(response => response.json() as AuthResponse);
  }
}
