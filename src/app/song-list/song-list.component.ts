import { Component, OnInit, Input } from '@angular/core';
import {Song} from "../song";
import {PlayerService} from "../player.service";
import {FavouriteService} from "../services/favourite.service";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  @Input() songs:Song[];

  constructor(private playerService:PlayerService, private favouriteService:FavouriteService) {
  }

  ngOnInit() {
  }

  favourite(song:Song) {
    this.favouriteService.favourite(song)
      .then(favourite=> {
        console.log(favourite);
      })
  }

}
