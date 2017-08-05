import { Component, OnInit,Input } from '@angular/core';
import {History} from "../Models/History";
import {PlayerService} from '../services/player.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  @Input() histories:History[];

  private songFilter:any = {title: ''};

  constructor(public playerService:PlayerService) {
  }

  ngOnInit() {
  }

}
