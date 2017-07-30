import {BaseService} from "./BaseService";
import {AuthHttp} from "angular2-jwt";
import {Song} from "../song";
import {Injectable } from '@angular/core';
import {ConfigService} from "./config.service";
/**
 * Created by nursultan on 7/30/17.
 */

@Injectable()
export class HistoryService extends BaseService {

  constructor(private authHttp:AuthHttp, private configService:ConfigService) {
    super();
  }

  start(song:Song) {
    this.authHttp.post(this.configService.APIS_URL + '/history/start/' + song.uuid, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  stop(song:Song) {
    this.authHttp.put(this.configService.APIS_URL + '/history/stop/' + song.uuid, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError)
  }
}
