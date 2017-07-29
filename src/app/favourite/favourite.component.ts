import { Component, OnInit } from '@angular/core';
import {FavouriteService} from "../services/favourite.service";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  public favourites;

  constructor(private favouriteService:FavouriteService) {
  }

  ngOnInit() {
    this.favouriteService.all()
      .then(favourites => {
        this.favourites = favourites;
      })
  }

}
