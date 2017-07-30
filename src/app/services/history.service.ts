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

  start(uuid:string) {
    return this.authHttp.post(this.configService.APIS_URL + '/history/start/' + uuid, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  stop(uuid:string) {
    return this.authHttp.put(this.configService.APIS_URL + '/history/stop/' + uuid, {})
      .toPromise()
      .then(response => response)
      .catch(this.handleError)
  }

  updateHistory(currentUuid:string, nextUuid:string):void {
    if (currentUuid) {
      this.stop(currentUuid)
        .then(()=> {
          this.start(nextUuid)
        });
    } else {
      this.start(nextUuid);
    }
  }
}
