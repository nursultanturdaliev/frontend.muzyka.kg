import { Component, OnInit,Input,OnChanges } from '@angular/core';
import {Song} from "../song";
import {ArtistService} from "../artist.service";
import {Artist} from "../artist";

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['./my-songs.component.css']
})
export class MySongsComponent implements OnInit,OnChanges {
  @Input() song:Song;
  public songs:Song[];

  constructor(private artistService:ArtistService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.songs = [];
    this.song.artists.forEach((artist:Artist) => {
      this.artistService.getArtist(artist.id)
        .then(((artist:Artist) => {
          artist.songs.forEach((song:Song) => {
            this.songs.push(song);
          });
        }));
    });
  }
}
