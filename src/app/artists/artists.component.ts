import {Component, OnInit} from '@angular/core';
import {ArtistsService} from '../artists.service';
import {Artist} from "../artist";
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
  providers: [ArtistsService]
})
export class ArtistsComponent implements OnInit {
  private artists:Artist[];
  private page:number;
  private noMoreArtists:boolean;

  constructor(private artistsService:ArtistsService) {
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
    this.artistsService.getArtists(this.page)
      .then(artists => {
        if (artists.length === 0) {
          this.noMoreArtists = true;
        }
        Array.prototype.push.apply(this.artists, artists);
      });
  }
}
