import {Component, OnInit} from '@angular/core';
import {ArtistsService} from '../artists.service';
import {Artist} from "../artist";
@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.css'],
    providers: [ArtistsService]
})
export class ArtistsComponent implements OnInit {
    private artists: Artist[];

    constructor(private artistsService: ArtistsService) {
    }

    ngOnInit() {
        this.artistsService.getArtists()
            .then(artists => this.artists = artists);
    }
}
