import {Component, OnInit} from '@angular/core';
import {Songs} from "../songs";
import {SongsService} from "../songs.service";
@Component({
    selector: 'app-songs',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.css'],
    providers: [SongsService]
})
export class SongsComponent implements OnInit {
    private songs: Songs[];

    constructor(private songsService: SongsService) {
    }

    ngOnInit() {
        this.songsService.getSongs()
            .then(songs => this.songs = songs);
    }

}
