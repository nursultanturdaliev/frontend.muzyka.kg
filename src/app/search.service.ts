import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Search} from "./search";
import {SearchResult} from "./SearchResult";

@Injectable()
export class SearchService {

  private searchUrl = 'http://localhost:8000/api/search/';

  constructor(private http: Http) {
  }

  getResults(searchText): Promise<SearchResult> {
    return this.http.get(this.searchUrl + searchText)
      .toPromise()
      .then(response => response.json() as SearchResult)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }


}
