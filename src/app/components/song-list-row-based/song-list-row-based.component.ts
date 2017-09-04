import { Component, OnInit, Input } from '@angular/core';
import {Song} from '../../Models/song';
import {PlayerService} from '../../services/player.service';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-song-list-row-based',
  templateUrl: './song-list-row-based.component.html',
  styleUrls: ['./song-list-row-based.component.css']
})
export class SongListRowBasedComponent implements OnInit {

  @Input() songs:Song[];
  @Input() title:string;
  public songFilter:any = {title: ''};

  constructor(public playerService:PlayerService,
              public appService:AppService) {
  }

  ngOnInit() {
  }

}