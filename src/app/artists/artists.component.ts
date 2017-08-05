import {Component, OnInit} from '@angular/core';
import {Artist} from "../artist";
import {ArtistService} from "../artist.service";
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
})
export class ArtistsComponent implements OnInit {
  private artists:Artist[];
  private page:number;
  private noMoreArtists:boolean;
  public songFilter:any = {name: ''};
  constructor(private artistService:ArtistService) {
    this.page = 1;
    this.artists = [];
    this.noMoreArtists = false;
  }

  ngOnInit() {
    this.updateArtists();
  }

  onScrollDown():void {
    this.page += 1;
    this.updateArtists();
  }

  private updateArtists():void {
    if (this.noMoreArtists) {
      return;
    }
    this.artistService.getArtists(this.page)
      .then(artists => {
        if (artists.length === 0) {
          this.noMoreArtists = true;
        }
        Array.prototype.push.apply(this.artists, artists);
      });
  }
}
