/**
 * Created by nursultan on 7/30/17.
 */
import {Injectable} from '@angular/core'
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr/index";
import {FavouriteService} from "./favourite.service";
import {PlayerService} from '../services/player.service';
import {Song} from '../Models/song';
import {ToastConfig} from "ngx-toastr/index";
import {Favourite} from "../Models/Favourite";
import {ConfigService} from './config.service';
@Injectable()
export class AppService {

  constructor(private playerService: PlayerService,
              private favouriteService: FavouriteService,
              private toastrService: ToastrService,
              private authService: AuthService,
              private configService: ConfigService) {
  }

  favourite(song:Song) {
    if (!this.authService.loggedIn()) {
      let config = new ToastConfig();
      config.timeOut = 5000;
      this.toastrService.warning('Ырларды сүйгөн ырларым тизмегине кошуу мүмкүнчүлүгү катталган колдонуучулар үчүн гана иштейт.', 'Кечиресиз', config);
      return;
    }
    this.favouriteService.favourite(song)
      .then((favourite:Favourite)=> {
        this.toastrService.info('Сиз сүйгөн ырлар тизмегине кошулду', favourite.song.artist_as_one + ' ' + favourite.song.title);
      })
      .catch((response) => {
        if(response.status == 409){
          this.toastrService.warning('Сүйгөн ырлар тизмегинде эчак эле кошулган.');
        }
      });
  }

  removeFavourite(song:Song) {
    this.favouriteService.removeFavourite(song)
      .then((favourite:Favourite)=> {
        this.toastrService.info('Сиз сүйгөн ырлар тизмегинен өчүрүлдү.', favourite.song.artist_as_one + ' ' + favourite.song.title);
      })
      .catch((response) => {
        if(response.status == 409){
          this.toastrService.warning('Бул ыр сүйгөн ырлар тизмегинде жок.');
        }
      });
  }

  download(song: Song) {
    let downloadUrl = this.configService.API_URL + '/song/stream/' + song.uuid;

    var save = document.createElement('a');
    save.href = downloadUrl;
    save.target = '_blank';
    save.download = downloadUrl;
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
      false, false, false, false, 0, null);
    save.dispatchEvent(evt);
    (window.URL).revokeObjectURL(save.href);
  }
}
