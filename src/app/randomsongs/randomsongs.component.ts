import { Component, OnInit } from '@angular/core';
import {Song} from "../song";
import {PlayerService} from "../player.service";
import {SongsService} from "../songs.service";

@Component({
  selector: 'app-randomsongs',
  templateUrl: './randomsongs.component.html',
  styleUrls: ['./randomsongs.component.css']
})
export class RandomsongsComponent implements OnInit {

  private songs:Song[];

  constructor(private songsService:SongsService) {
  }

  ngOnInit() {
    this.songsService.getRandomSongs({})
      .then(randomSongs => {
        this.songs = randomSongs;
      });
  }

}
