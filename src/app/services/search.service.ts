import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Search} from "../Models/search";
import {ConfigService} from "./config.service";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class SearchService {

  constructor(private http: Http, private configService: ConfigService) {
  }

  getResults(searchText):Promise<Search> {
    return this.http.get(this.configService.API_URL + '/search/' + searchText)
      .toPromise()
      .then(response => response.json() as Search)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
