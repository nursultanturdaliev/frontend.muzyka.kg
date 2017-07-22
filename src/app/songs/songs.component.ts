import {Component, OnInit} from '@angular/core';
import {Song} from '../song';
import {SongsService} from '../songs.service';
import {PlayerService} from '../player.service';
import {PlayerComponent} from "../player/player.component";
@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongsService]
})
export class SongsComponent implements OnInit {
  private songs:Song[];

  constructor(private songsService:SongsService, private playerService:PlayerService) {
  }

  play(song:Song, songs, index) {
    this.playerService.currentTime = 0;
    this.playerService.currentSongTitle = song.title;
    this.playerService.setCurrentSong(song);
    this.playerService.setSongs(songs);
    this.playerService.setIndex(index);
  }

  ngOnInit() {
    this.songsService.getSongs()
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

  isCurrentSong(song:Song) {
    if (!this.playerService.getCurrentSong()) {
      return false;
    }
    return this.playerService.getCurrentSong().uuid == song.uuid;
  }
}
