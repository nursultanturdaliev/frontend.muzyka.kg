import {Component, OnInit} from '@angular/core';
import {Search} from "../../Models/search";
import {SearchService} from "../../services/search.service";
import {AuthHttp} from "angular2-jwt";
import {ArtistService} from "../../services/artist.service";
import {Router} from "@angular/router";
import {Song} from "../../Models/song";
import {Artist} from "../../Models/artist";

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

  navigateToArtistPage(artist:Artist){
    this.result = null;
    this.router.navigate(['artist/'+ artist.id]);
  }

  navigateToSongPage(song:Song){
    this.result = null;
    this.router.navigate(['song/'+ song.uuid]);
  }

}
