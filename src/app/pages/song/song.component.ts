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
  private sub:Subscription;


  constructor(private songService:SongService,
              private route:ActivatedRoute) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.songId = params['uuid'];
      this.onUrlChange();
    });
  }
  onUrlChange(){
    this.songService.getSong(this.songId)
      .then(song => {
        this.song = song;
      });
  }

  ngOnDestroy():void {
    this.sub.unsubscribe();
  }

}
