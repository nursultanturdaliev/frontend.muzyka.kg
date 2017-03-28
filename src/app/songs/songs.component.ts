import {Component, OnInit} from '@angular/core';
import {Songs} from '../songs';
import {SongsService} from '../songs.service';
import {PlayerService} from '../player.service';
@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongsService]
})
export class SongsComponent implements OnInit {
  private songs: Songs[];

  constructor(private songsService: SongsService, private playerService: PlayerService) {
  }

  play(song: Songs, songs, index) {
    this.playerService.setCurrentSong(song);
    this.playerService.setSongs(songs);
    this.playerService.setIndex(index);
  }

  ngOnInit() {
    this.songsService.getSongs()
      .then(songs => this.songs = songs);
  }

}
