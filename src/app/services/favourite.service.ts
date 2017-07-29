import {BaseService} from "./BaseService";
import {Injectable} from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import {ConfigService} from "./config.service";
import {Favourite} from "../Models/Favourite";
import {Song} from "../song";
/**
 * Created by nursultan on 7/29/17.
 */

@Injectable()
export class FavouriteService extends BaseService {

  constructor(private authHttp:AuthHttp, private configService:ConfigService) {
    super();
  }

  all():Promise<Favourite[]> {
    return this.authHttp.get(this.configService.APIS_URL + '/favourite')
      .toPromise()
      .then(response => response.json() as Favourite[])
      .catch(this.handleError);
  }

  favourite(song:Song):Promise<Favourite> {
    return this.authHttp.post(this.configService.APIS_URL + '/favourite/song/' + song.uuid, {})
      .toPromise()
      .then(response => response.json() as Favourite)
      .catch(this.handleError);
  }
}
