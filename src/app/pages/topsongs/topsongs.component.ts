import { Component, OnInit } from '@angular/core';
import {Song} from '../../Models/song';
import {PlayerService} from '../../services/player.service';
import {SongService} from '../../services/song.service';

@Component({
  selector: 'app-topsongs',
  templateUrl: './topsongs.component.html',
  styleUrls: ['./topsongs.component.css'],
})
export class TopsongsComponent implements OnInit {

  public songs:Song[];

  constructor(private topSongService:SongService, private playerService:PlayerService) {
  }

  ngOnInit() {
    this.topSongService.getTopSongs()
      .then(topSongs => {
        this.songs = topSongs;
      });
  }

}
