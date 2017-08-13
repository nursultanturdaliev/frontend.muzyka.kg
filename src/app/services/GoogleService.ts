import {Injectable} from '@angular/core';
/**
 * Created by nursultan on 8/13/17.
 */
@Injectable()
export class GoogleService {
  public auth2:any;

  constructor() {
    gapi.load('auth2', ()=> {
      this.auth2 = gapi.auth2.init({
        client_id: '477569422113-tph1nvuv3n01mhkki09494u7n1moru0r.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: 'profile'
      });
    });
  }

  public signIn(){
    return this.auth2.signIn();
  }
}
