import { Component, OnInit,Input } from '@angular/core';
import {Artist} from "../artist";

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.css']
})
export class ArtistInfoComponent implements OnInit {

  @Input() artist:Artist;

  constructor() {
  }

  ngOnInit() {
  }

}
