import {Component, OnInit} from '@angular/core';
import {Song} from '../../Models/song';
import {SongService} from '../../services/song.service';
import {PlayerService} from '../../services/player.service';
import {PlayerComponent} from '../../components/index';
import {AppService} from '../../services/app.service';
import {LocalStorageService} from "../../services/LocalStorageService";
@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongService],
})
export class SongsComponent implements OnInit {
  songs: Song[];
  searchText: string;
  page: number;
  playingSong: Song;

  constructor(private SongService: SongService,
              public playerService: PlayerService,
              public appService: AppService,
              public localStorageService:LocalStorageService) {
    this.page = 1;
  }

  ngOnInit() {
    this.SongService.getSongs(this.page)
      .then(songs => {
        this.songs = songs;
      });
  }

  play(song: Song, songs: Song[], i: number) {
    this.playerService.play(song);
    this.playingSong = song;
  }

  search(value) {
    this.SongService.search(value)
      .then(songs => {
        this.songs = songs;
      });
  }

  onScrollDown() {
    this.page += 1;
    this.SongService.getSongs(this.page)
      .then(songs => {
        Array.prototype.push.apply(this.songs, songs);
      });
  }
}
