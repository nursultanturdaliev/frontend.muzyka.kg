import { Component, OnInit, Input } from '@angular/core';
import {Song} from "../song";
import {PlayerService} from "../player.service";

@Component({
  selector: 'app-song-list-row-based',
  templateUrl: './song-list-row-based.component.html',
  styleUrls: ['./song-list-row-based.component.css']
})
export class SongListRowBasedComponent implements OnInit {

  @Input() songs:Song[];
  @Input() title:string;
  private songFilter:any = {title: ''};

  constructor(public playerService:PlayerService) {
  }

  ngOnInit() {
  }

}
