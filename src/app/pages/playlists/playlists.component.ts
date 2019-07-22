import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {Playlist} from "../../Models/playlist";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements OnInit {

  public playlists:Playlist[];
  public playlistFilter:any = {name: ''};

  constructor(private playlistService:PlaylistService) {
    this.playlists = [];
  }

  ngOnInit():void {
    this.playlistService.getPlaylists(1)
      .then(playlists => {
        this.playlists = playlists;
      });
  }
}
