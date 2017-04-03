import {Component} from '@angular/core';
import {PlayerService} from "./player.service";
import {SongsService} from "./songs.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SongsService]
})

export class AppComponent {
  title = 'MUZYKA.KG';

  constructor(private playerService: PlayerService) {

  }
}
