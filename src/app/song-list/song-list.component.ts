import { Component, OnInit, Input } from '@angular/core';
import {Song} from "../song";
import {PlayerService} from "../player.service";
import {FavouriteService} from "../services/favourite.service";
import {ToastrService} from "ngx-toastr/index";
import {Favourite} from "../Models/Favourite";
import {AuthService} from "../services/auth.service";
import {ToastConfig} from "ngx-toastr/index";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  @Input() songs:Song[];

  constructor(private playerService:PlayerService,
              private favouriteService:FavouriteService,
              private toastrService:ToastrService,
              private authService:AuthService) {
  }

  ngOnInit() {
  }

  favourite(song:Song) {
    if (!this.authService.loggedIn()) {
      let config = new ToastConfig();
      config.timeOut = 15000;
      config.closeButton = true;
      this.toastrService.warning('Ырларды сүйгөн ырларым тизмегине кошуу мүмкүнчүлүгү катталган колдоуучулар үчүн гана иштейт.', 'Кечиресиз', config);
      return;
    }
    this.favouriteService.favourite(song)
      .then((favourite:Favourite)=> {
        this.toastrService.info('Сиз сүйгөн ырлар тизмегине кошулду', favourite.song.artist_as_one + ' ' + favourite.song.title);
      })
  }

}
