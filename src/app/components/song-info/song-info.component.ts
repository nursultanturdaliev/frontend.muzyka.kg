import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Artist} from '../../Models/artist';
import {Song} from '../../Models/song';
import {SongService} from '../../services/song.service';
import {PlayerService} from "../../services/player.service";
import {AppService} from "../../services/app.service";
import {LocalStorageService} from "../../services/LocalStorageService";

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.css']
})
export class SongInfoComponent {

  @Input() song:Song;

  constructor(private songService:SongService,
              private playerService:PlayerService,
              public  appService:AppService,
              public localStorageService : LocalStorageService) {
  }

}
