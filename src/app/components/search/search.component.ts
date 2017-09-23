import {Component, OnInit} from '@angular/core';
import {Search} from "../../Models/search";
import {SearchService} from "../../services/search.service";
import {AuthHttp} from "angular2-jwt";
import {ArtistService} from "../../services/artist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  _searchText: any;
  hide: boolean;
  private search: Search[];
  constructor(private searchService: SearchService, public artistService:ArtistService,private router: Router) {
  }

  private result: Search;
  set searchText(searchText: string) {
    this.hide = true;
    this._searchText = searchText;
    if (this._searchText == ''){
      this.result = null;
    }else {
    console.log(searchText);
    console.log(this.result);
    this.searchService.getResults(searchText)
      .then(result => {this.result = result; });
    }
  }

  getResultArtist(artist){
    this.result = null;
    this.router.navigate(['artist/',artist]);
  }

  getResultSong(song){
    this.result = null;
    this.router.navigate(['song/',song]);
  }

}
