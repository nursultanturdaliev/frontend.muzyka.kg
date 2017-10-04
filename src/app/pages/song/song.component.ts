import {Component, OnDestroy, OnInit,Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ArtistService} from '../../services/artist.service';
import {Artist} from '../../Models/artist';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {SongService} from '../../services/song.service';
import {Song} from '../../Models/song';
import {PlayerService} from '../../services/player.service';
import {AppService} from '../../services/app.service';
import {LocalStorageService} from "../../services/LocalStorageService";
import {ShareService} from "../../services/share.service";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit, OnDestroy {

  public song:Song;
  public artist:Artist;
  private songSlug:any;
  private sub:Subscription;


  constructor(private songService:SongService,
              private route:ActivatedRoute,
              private appService:AppService,
              public playerService:PlayerService,
              public share:ShareService,
              public localStorageService:LocalStorageService,
              @Inject(DOCUMENT) public document:any) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe((params:Params) => {
      this.songSlug = params['slug'];
      this.onUrlChange();
    });
  }

  onUrlChange() {
    this.songService.getSong(this.songSlug)
      .then(song => {
        this.song = song;
      });
  }

  getCurrentUrl() {
    return this.document.location.href;
  }

  ngOnDestroy():void {
    this.sub.unsubscribe();
  }

}
