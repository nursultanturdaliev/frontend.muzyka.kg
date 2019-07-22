import {Component, OnInit} from '@angular/core';
import {SongService} from '../../services/song.service';
import {ArtistService} from '../../services/artist.service';
import {Song} from '../../Models/song';
import {PlayerService} from '../../services/player.service';
import {AppService} from '../../services/app.service';
import {LocalStorageService} from '../../services/LocalStorageService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public discoverSongs: Song[];
  public newSongs: Song[];
  public topSongs: Song[];

  constructor(private songService: SongService,
              private artistService: ArtistService,
              private playerService: PlayerService,
              private appService: AppService,
              private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.songService.getRandomSongs({})
      .then(songs => {
        this.discoverSongs = songs.slice(0, 12);
      });

    this.songService.getNewSongs()
      .then(songs => {
        this.newSongs = songs.slice(0, 9);
      });

    this.songService.getTopSongs()
      .then(songs => {
        this.topSongs = songs.slice(0, 9);
      });
  }

}
