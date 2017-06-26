import { Component, OnInit } from '@angular/core';
import {NewSongsService} from "../newSongs.service";
import {Song} from "../song";
import {PlayerService} from "../player.service";

@Component({
  selector: 'app-newsongs',
  templateUrl: './newsongs.component.html',
  styleUrls: ['./newsongs.component.css'],
  providers: [NewSongsService]
})
export class NewsongsComponent implements OnInit {

  private newSongs: Song[];
  constructor(private newSongsService: NewSongsService, private playerService: PlayerService) {
  }

  play(song: Song, songs, index) {
    this.playerService.currentTime = 0;
    this.playerService.currentSongTitle = song.title;
    this.playerService.setCurrentSong(song);
    this.playerService.setSongs(songs);
    this.playerService.setIndex(index);
  }

  ngOnInit() {
    this.newSongsService.getNewSongs()
        .then(newSongs => {
          this.newSongs = newSongs;
          this.playerService.currentTime = 0;
          this.playerService.setIndex(0);
          this.playerService.setSongs(newSongs);
        });
  }

}
