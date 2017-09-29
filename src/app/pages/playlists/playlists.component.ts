import {Component, OnInit,Inject} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {Playlist} from "../../Models/playlist";
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements OnInit {

  public playlists:Playlist[];
  public page:number;
  public noMorePlaylists:boolean;
  public playlistsScrollContainer;

  constructor(private playlistService:PlaylistService, @Inject(DOCUMENT) private document:any) {
    this.page = 1;
    this.playlists = [];
    this.noMorePlaylists = false;
    this.playlistsScrollContainer = this.document.querySelector('#bjax-target');
  }

  ngOnInit():void {
    this.updatePlaylists();
  }

  onScrollDown():void{
    this.page +=1;
    this.updatePlaylists();
  }

  private updatePlaylists():void {
    if (this.noMorePlaylists) {
      return;
    }
    this.playlistService.getPlaylists(this.page)
      .then(playlists => {
        if (playlists.length === 0) {
          this.noMorePlaylists = true;
        }
        Array.prototype.push.apply(this.playlists, playlists);
      })
  }
}
