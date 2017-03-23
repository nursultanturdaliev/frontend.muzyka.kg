import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../artist.service';
import {Artist} from "../artist";
@Component({
    selector: 'app-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.css'],
    providers: [ArtistService]
})
export class ArtistComponent implements OnInit {
    private artists: Artist[];

    constructor(private artistService: ArtistService) {
    }


    ngOnInit() {
        this.artistService.getArtists()
            .then(artists => this.artists = artists);
    }
}
