import { Component, OnInit } from '@angular/core';
import {SongsService} from "../songs.service";
import {ArtistService} from "../artist.service";
import {Song} from "../song";
import {PlayerService} from "../player.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public discoverSongs:Song[];
  public newSongs:Song[];
  public topSongs:Song[];

  constructor(private songService:SongsService, private artistService:ArtistService, private playerService:PlayerService) {
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
