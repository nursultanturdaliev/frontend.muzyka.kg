import {Component,OnInit,OnDestroy} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {Subscription} from "rxjs/Subscription";
import {Params, ActivatedRoute} from '@angular/router';
import {Playlist} from "../../Models/playlist";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnInit,OnDestroy {
  public playlistSlug:string;
  public sub:Subscription;
  public playlist:Playlist;

  constructor(private playlistService:PlaylistService,
              private route:ActivatedRoute) {

  }


  ngOnInit():void {
    this.sub = this.route.params.subscribe((params:Params) => {
      this.playlistSlug = params['slug'];
      this.onUrlChange();
    });
  }

  private onUrlChange() {
    this.playlistService.getPlaylist(this.playlistSlug)
      .then(playlist => {
        this.playlist = playlist;
      });
  }

  ngOnDestroy():void {
    this.sub.unsubscribe();
  }

}
