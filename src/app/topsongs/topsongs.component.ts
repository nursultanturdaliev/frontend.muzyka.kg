import { Component, OnInit } from '@angular/core';
import {Song} from "../song";
import {PlayerService} from "../player.service";
import {SongsService} from "../songs.service";

@Component({
  selector: 'app-topsongs',
  templateUrl: './topsongs.component.html',
  styleUrls: ['./topsongs.component.css'],
})
export class TopsongsComponent implements OnInit {

  private topSongs: Song[];
  constructor(private topSongsService: SongsService, private playerService: PlayerService) {
  }

  play(song: Song, songs, index) {
    this.playerService.currentTime = 0;
    this.playerService.currentSongTitle = song.title;
    this.playerService.setCurrentSong(song);
    this.playerService.setSongs(songs);
    this.playerService.setIndex(index);
  }

  ngOnInit() {
    this.topSongsService.getTopSongs()
        .then(topSongs => {
          this.topSongs = topSongs;
          this.playerService.currentTime = 0;
          this.playerService.setIndex(0);
          this.playerService.setSongs(topSongs);
        });
  }

}
