import {Component, OnInit} from '@angular/core';
import {Song} from '../song';
import {SongsService} from '../songs.service';
import {PlayerService} from '../player.service';
import {PlayerComponent} from "../player/player.component";
@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongsService],
})
export class SongsComponent implements OnInit {
  public songs:Song[];
  public page:number;
  searchText:string;

  constructor(private songsService:SongsService, private playerService:PlayerService) {
    this.page = 1;
  }

  ngOnInit() {
    this.songsService.getSongs(this.page)
      .then(songs => {
        this.songs = songs;
        this.playerService.currentTime = 0;
        this.playerService.setIndex(0);
        this.playerService.setSongs(songs);
      });
  }

  currentSong() {
    return this.playerService.getCurrentSong();
  }

  search(value) {
    this.songsService.search(value)
      .then(songs => {
        this.songs = songs;
      });
  }

  onScrollDown() {
    this.page += 1;
    this.songsService.getSongs(this.page)
      .then(songs => {
        Array.prototype.push.apply(this.songs, songs);
      });
  }
}
