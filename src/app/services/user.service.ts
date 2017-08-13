/**
 * Created by nursultan on 8/12/17.
 */
import {Injectable} from '@angular/core';
import {BaseService} from "./BaseService";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {LoginUser} from "../Models/LoginUser";
import {User} from "../Models/user";
import {ConfigService} from "./config.service";

@Injectable()
export class UserService extends BaseService {

  constructor(private authHttp:AuthHttp, private configService:ConfigService) {
    super();
  }

  public update(user:User) {
    return this.authHttp.put(this.configService.APIS_URL + '/user/update', user)
      .toPromise()
      .then(response => response.json() as User);
  }

  public getUser():Promise<User> {
    return this.authHttp.get(this.configService.APIS_URL + '/user')
      .toPromise()
      .then((response) => response.json() as User)
      .catch(this.handleError);
  }
}
