import { Component, OnInit } from '@angular/core';
import {Song} from "../song";
import {PlayerService} from "../player.service";
import {SongsService} from "../songs.service";

@Component({
  selector: 'app-newSongs',
  templateUrl: './newSongs.component.html',
  styleUrls: ['./newSongs.component.css']
})
export class NewsongsComponent implements OnInit {

  private songs:Song[];

  constructor(private songsService:SongsService, private playerService:PlayerService) {
  }

  ngOnInit() {
    this.songsService.getNewSongs()
      .then(newSongs => {
        this.songs = newSongs;
        this.playerService.currentTime = 0;
        this.playerService.setIndex(0);
        this.playerService.setSongs(newSongs);
      });
  }

}
