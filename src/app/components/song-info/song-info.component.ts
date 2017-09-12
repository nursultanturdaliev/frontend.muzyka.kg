import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Artist} from '../../Models/artist';
import {Song} from '../../Models/song';
import {SongService} from '../../services/song.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from "@angular/router";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.css']
})
export class SongInfoComponent implements OnInit, OnDestroy {

  private song:Song;
  private writtenBy:string;
  private composedBy:string;
  private lyrics:string;
  private songId:any;
  // public artistId:number;
  // public randomSongs:Song[];
  private sub:Subscription;
  // public artistSongs:string;
  // public listen:string;
  public youtube:string;


  constructor(private songService:SongService,private route:ActivatedRoute, private playerService:PlayerService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.songId = params['uuid'];
    });

    this.songService.getSong(this.songId)
        .then(song => {
          this.song = song;
          this.youtube = "sK-TQ_ZvAPI";
          this.composedBy = "fghfg";
          this.writtenBy = "asdas";
          this.lyrics = "TEXT TEXT TEXT";
        });
  }


  ngOnDestroy():void {
    this.sub.unsubscribe();
  }

}
