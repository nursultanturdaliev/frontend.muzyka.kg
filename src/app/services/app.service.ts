/**
 * Created by nursultan on 7/30/17.
 */
import {Injectable} from '@angular/core'
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr/index";
import {FavouriteService} from "./favourite.service";
import {PlayerService} from "../player.service";
import {Song} from "../song";
import {ToastConfig} from "ngx-toastr/index";
import {Favourite} from "../Models/Favourite";
@Injectable()
export class AppService {

  constructor(private playerService:PlayerService,
              private favouriteService:FavouriteService,
              private toastrService:ToastrService,
              private authService:AuthService) {
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
