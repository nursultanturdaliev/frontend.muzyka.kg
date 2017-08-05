import { Component, OnInit,Input,OnChanges } from '@angular/core';
import {Song} from '../Models/song';
import {ArtistService} from "../services/artist.service";
import {Artist} from '../Models/artist';

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['./my-songs.component.css']
})
export class MySongsComponent implements OnInit,OnChanges {
  @Input() song:Song;
  public songs:Song[];
  public artist:Artist;

  constructor(private artistService:ArtistService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.songs = [];
    this.artist = this.song.artists[0];

      this.artistService.getArtist(this.artist.id)
        .then(((artist:Artist) => {
          this.artist = artist;
          artist.songs.forEach((song:Song) => {
            this.songs.push(song);
          });
        }));
  }
}
