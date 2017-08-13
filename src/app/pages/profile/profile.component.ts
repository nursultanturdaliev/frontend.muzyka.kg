import { Component, OnInit } from '@angular/core';
import {FavouriteService} from '../../services/favourite.service';
import {UserService} from "../../services/user.service";
import {User} from "../../Models/user";
import {ToastrService} from "ngx-toastr/index";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public favourite:any;
  public favouriteTitle:string;
  private user:any;

  constructor(private favouriteService:FavouriteService,
              private userService:UserService,
              private toastrService:ToastrService) {
  }

  ngOnInit() {
    this.favouriteTitle = 'Сүйгөн ырларым';

    this.favouriteService.all()
      .then(favourite => {
        this.favourite = favourite;
      });
    this.populateUser();
  }

  private populateUser() {
    this.userService.getUser()
      .then((user) => {
        this.user = user;
      });
  }

  handleUserUpdate(user:any) {
    this.toastrService.info('Ийгиликтүү сакталды');
  }

}
