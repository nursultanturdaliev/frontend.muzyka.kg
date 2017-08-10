import { Component, OnInit } from '@angular/core';
import {Song} from '../../Models/song';
import {PlayerService} from '../../services/player.service';
import {SongService} from '../../services/song.service';

@Component({
  selector: 'app-newSongs',
  templateUrl: './newSongs.component.html',
  styleUrls: ['./newSongs.component.css']
})
export class NewsongsComponent implements OnInit {

  public songs:Song[];

  constructor(private SongService:SongService, private playerService:PlayerService) {
  }

  ngOnInit() {
    this.SongService.getNewSongs()
      .then(newSongs => {
        this.songs = newSongs;
        this.playerService.currentTime = 0;
        this.playerService.setIndex(0);
        this.playerService.setSongs(newSongs);
      });
  }

}
