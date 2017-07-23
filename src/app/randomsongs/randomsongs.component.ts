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

  private randomSongs:Song[];

  constructor(private songsService:SongsService, public playerService:PlayerService) {
  }

  ngOnInit() {
    this.songsService.getRandomSongs({})
      .then(randomSongs => {
        this.randomSongs = randomSongs;
        this.playerService.currentTime = 0;
        this.playerService.setIndex(0);
        this.playerService.setSongs(randomSongs);
      });
  }

}
