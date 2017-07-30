import { Component, OnInit } from '@angular/core';
import {HistoryService} from "../services/history.service";
import {FavouriteService} from "../services/favourite.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public histories;
  public favourite:any;
  public favouriteTitle:string;

  constructor(private historyService:HistoryService,
              private favouriteService:FavouriteService) {
  }

  ngOnInit() {
    this.favouriteTitle = 'Сүйгөн ырларым';
    this.historyService.all()
      .then(histories => {
        this.histories = histories;
      });

    this.favouriteService.all()
      .then(favourite => {
        this.favourite = favourite;
      });
  }

}
