import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtistService} from "../artist.service";
import {Artist} from "../artist";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit, OnDestroy {

  private artist: Artist;
  private artistId: number;
  private sub: Subscription;

  constructor(private artistService: ArtistService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.artistId = +params['id'];
    });

    this.artistService.getArtist(this.artistId)
      .then(artist => {
        this.artist = artist;
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
