import {Component, OnInit} from '@angular/core';
import {Artist} from '../../Models/artist';
import {ArtistService} from '../../services/artist.service';
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css'],
})
export class ArtistsComponent implements OnInit {
  public artists:Artist[];
  public page:number;
  public noMoreArtists:boolean;
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
