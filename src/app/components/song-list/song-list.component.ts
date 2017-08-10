import { Component, OnInit, Input } from '@angular/core';
import {Song} from '../../Models/song';
import {AppService} from '../../services/app.service';
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  @Input() songs:Song[];

  constructor(public appService:AppService, public playerService:PlayerService) {

  }

  ngOnInit() {
  }


}
