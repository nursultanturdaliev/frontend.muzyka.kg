import {Component} from '@angular/core';
import {PlayerService} from "./player.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MUZYKA.KG';

  constructor(private playerService: PlayerService) {

  }
}
