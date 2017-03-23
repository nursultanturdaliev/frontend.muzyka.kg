import {Component, OnInit} from '@angular/core';
import {ArtistsService} from '../artists.service';
import {Artists} from "../artists";
@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.css'],
    providers: [ArtistsService]
})
export class ArtistsComponent implements OnInit {
    private artists: Artists[];

    constructor(private artistsService: ArtistsService) {
    }


    ngOnInit() {
        this.artistsService.getArtists()
            .then(artists => this.artists = artists);
    }
}
