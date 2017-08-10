import { Component, OnInit } from '@angular/core';
import {SongService} from '../../services/song.service';
import {ArtistService} from '../../services/artist.service';
import {Song} from '../../Models/song';
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public discoverSongs:Song[];
  public newSongs:Song[];
  public topSongs:Song[];

  constructor(private songService:SongService, private artistService:ArtistService, private playerService:PlayerService) {
  }

  ngOnInit() {
    this.songService.getRandomSongs({})
      .then(songs => {
        this.discoverSongs = songs.slice(0, 12);
      });

    this.songService.getNewSongs()
      .then(songs => {
        this.newSongs = songs;
      });

    this.songService.getTopSongs()
      .then(songs => {
        this.topSongs = songs;
      })
  }

}
