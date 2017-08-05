import {Component} from '@angular/core';
import {PlayerService} from './services/player.service';
import {SongService} from "./services/song.service";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SongService]
})

export class AppComponent {
  title = 'MUZYKA.KG';

  constructor(private playerService:PlayerService, public authService:AuthService) {

  }
}
