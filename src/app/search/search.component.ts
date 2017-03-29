import {SearchService} from "../search.service";
import {Search} from "../search";
import {Component} from "@angular/core";
import {SearchResult} from "../SearchResult";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent {

  _searchText: any;
  private search: Search[];
  private result: SearchResult;

  constructor(private searchService: SearchService) {
  }

  set searchText(searchText: string) {
    this._searchText = searchText;
    this.searchService.getResults(searchText)
      .then(result => {
        this.result = result;
      })
  }


}
