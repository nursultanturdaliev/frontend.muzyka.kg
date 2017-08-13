import { Component, OnInit } from '@angular/core';
import {FavouriteService} from '../../services/favourite.service';
import {UserService} from "../../services/user.service";
import {User} from "../../Models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public favourite:any;
  public favouriteTitle:string;

  constructor(private favouriteService:FavouriteService,
              private userService:UserService) {
  }

  ngOnInit() {
    this.favouriteTitle = 'Сүйгөн ырларым';

    this.favouriteService.all()
      .then(favourite => {
        this.favourite = favourite;
      });


  }

  handleUserUpdate(user:any) {
  }

}
