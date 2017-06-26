import { Component, OnInit } from '@angular/core';
import {TopSongsService} from "../topSongs.service";
import {Song} from "../song";
import {RandomSongsService} from "../randomSongs.service";
import {PlayerService} from "../player.service";

@Component({
  selector: 'app-randomsongs',
  templateUrl: './randomsongs.component.html',
  styleUrls: ['./randomsongs.component.css'],
  providers: [RandomSongsService]
})
export class RandomsongsComponent implements OnInit {

  private randomSongs: Song[];
  constructor(private randomSongsService: RandomSongsService, private playerService: PlayerService) {
  }

  play(song: Song, songs, index) {
    this.playerService.currentTime = 0;
    this.playerService.currentSongTitle = song.title;
    this.playerService.setCurrentSong(song);
    this.playerService.setSongs(songs);
    this.playerService.setIndex(index);
  }

  ngOnInit() {
    this.randomSongsService.getRandomSongs()
        .then(randomSongs => {
          this.randomSongs = randomSongs;
          this.playerService.currentTime = 0;
          this.playerService.setIndex(0);
          this.playerService.setSongs(randomSongs);
        });
  }

}
