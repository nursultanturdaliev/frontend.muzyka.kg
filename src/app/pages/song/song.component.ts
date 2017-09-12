import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtistService} from '../../services/artist.service';
import {Artist} from '../../Models/artist';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {SongService} from '../../services/song.service';
import {Song} from '../../Models/song';
import {PlayerService} from '../../services/player.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit, OnDestroy {

  private song:Song;
  public artist:Artist;
  private songId:any;
  public artistId:number;
  public randomSongs:Song[];
  private sub:Subscription;
  public artistSongs:string;
  public listen:string;

  constructor(private songService:SongService,
              private route:ActivatedRoute) {
    // this.artistSongs = 'Ырларым';
    // this.listen = 'Тыңшап көрүңүз';
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.songId = params['uuid'];
    });

    this.songService.getSong(this.songId)
      .then(song => {
        this.song = song;
      });
    // this.songService.getRandomSongs({'songId': this.songId})
    //   .then(randomSongs => {
    //     this.randomSongs = randomSongs
    //   });
  }

  ngOnDestroy():void {
    this.sub.unsubscribe();
  }

}
