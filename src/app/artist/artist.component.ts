import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtistService} from "../services/artist.service";
import {Artist} from '../Models/artist';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SongService} from '../services/song.service';
import {Song} from '../Models/song';
import {PlayerService} from '../services/player.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit, OnDestroy {

  private artist:Artist;
  private artistId:number;
  private randomSongs:Song[];
  private sub:Subscription;
  public artistSongs:string;
  public listen:string;

  constructor(private artistService:ArtistService,
              private songService:SongService,
              private route:ActivatedRoute) {
    this.artistSongs = 'Ырларым';
    this.listen = 'Тыңшап көрүңүз';
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.artistId = +params['id'];
    });

    this.artistService.getArtist(this.artistId)
      .then(artist => {
        this.artist = artist;
      });
    this.songService.getRandomSongs({'artistId': this.artistId})
      .then(randomSongs => {
        this.randomSongs = randomSongs
      });
  }

  ngOnDestroy():void {
    this.sub.unsubscribe();
  }

}
