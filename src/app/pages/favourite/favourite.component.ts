import { Component, OnInit } from '@angular/core';
import {FavouriteService} from '../../services/favourite.service';
import {LocalStorageService} from "../../services/LocalStorageService";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  public favourites;

  constructor(private favouriteService:FavouriteService,
              private localStorageService : LocalStorageService) {
  }

  ngOnInit() {
    this.favouriteService.all()
      .then(favourites => {
        this.favourites = favourites;
      });
  }

}
