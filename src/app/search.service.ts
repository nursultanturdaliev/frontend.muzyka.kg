import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Search} from "./search";
import {getResponseURL} from "@angular/http/src/http_utils";

@Injectable()
export class SearchService {

  private searchUrl = 'http://localhost:8000/api/search/';
  constructor(private http: Http) { }

  getResults(): Promise<Search[]>{
    return this.http.get(this.searchUrl)
      .toPromise()
      .then(response => response.json() as Search[])
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }

}
