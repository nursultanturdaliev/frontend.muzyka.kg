import {Component} from '@angular/core';
import {PlayerService} from './services/player.service';
import {SongService} from "./services/song.service";
import {AuthService} from "./services/auth.service";
import { FacebookService, InitParams } from 'ngx-facebook';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SongService]
})

export class AppComponent {

  constructor(private playerService:PlayerService,
              public authService:AuthService,
              private fb:FacebookService) {
    let initParams: InitParams = {
      appId      : '1974598029436106',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    };

    fb.init(initParams);

  }
}
