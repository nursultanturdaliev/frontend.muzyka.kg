import { Component, OnInit } from '@angular/core';
import {SearchService} from "../search.service";
import {Search} from "../search";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  private search: Search[];
  constructor(private searchService: SearchService) { }

  public searchChange(fileInput: any){
    console.log(fileInput);
  }
  ngOnInit() {
    this.searchService.getResults()
      .then(search => this.search = search);
  }

}
