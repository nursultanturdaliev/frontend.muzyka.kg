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
        client_id: '206742710770-4745okje7auaio006j53ng38141ar97p.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: 'profile'
      });
    });
  }

  public signIn(){
    return this.auth2.signIn();
  }
}
