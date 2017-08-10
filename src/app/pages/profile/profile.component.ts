import { Component, OnInit } from '@angular/core';
import {FavouriteService} from '../../services/favourite.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public favourite:any;
  public favouriteTitle:string;

  constructor(private favouriteService:FavouriteService) {
  }

  ngOnInit() {
    this.favouriteTitle = 'Сүйгөн ырларым';

    this.favouriteService.all()
      .then(favourite => {
        this.favourite = favourite;
      });
  }

}
