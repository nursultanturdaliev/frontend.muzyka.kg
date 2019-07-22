import { Component, OnInit, Input } from '@angular/core';
import {Song} from '../../Models/song';
import {AppService} from '../../services/app.service';
import {PlayerService} from '../../services/player.service';
import {LocalStorageService} from "../../services/LocalStorageService";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent {

  @Input() songs:Song[];

  constructor(public appService:AppService,
              public playerService:PlayerService,
              public localStorageService:LocalStorageService) {
  }

  public isDivisible(divident:number, divider:number) {
    return divident % divider == 0;
  }

}
