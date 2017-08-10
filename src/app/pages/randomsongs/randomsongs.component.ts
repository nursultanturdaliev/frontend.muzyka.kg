import { Component, OnInit } from '@angular/core';
import {Song} from '../../Models/song';
import {PlayerService} from '../../services/player.service';
import {SongService} from '../../services/song.service';

@Component({
  selector: 'app-randomsongs',
  templateUrl: './randomsongs.component.html',
  styleUrls: ['./randomsongs.component.css']
})
export class RandomsongsComponent implements OnInit {

  private songs:Song[];

  constructor(private SongService:SongService) {
  }

  ngOnInit() {
    this.SongService.getRandomSongs({})
      .then(randomSongs => {
        this.songs = randomSongs;
      });
  }

}
