import {Component, OnInit} from '@angular/core';
import {Song} from '../../Models/song';
import {PlayerService} from '../../services/player.service';
import {SongService} from '../../services/song.service';

@Component({
  selector: 'app-newsongs',
  templateUrl: './newsongs.component.html',
  styleUrls: ['./newsongs.component.css']
})
export class NewsongsComponent implements OnInit {

  public songs: Song[];

  constructor(private SongService: SongService, private playerService: PlayerService) {
  }

  ngOnInit() {
    this.SongService.getNewSongs()
      .then(newSongs => {
        this.songs = newSongs;
      });
  }

}
