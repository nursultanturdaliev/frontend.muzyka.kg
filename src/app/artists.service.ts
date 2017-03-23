import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Artists} from "./artists";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArtistsService {

    private artistsUrl = 'http://obon.aio.kg/api/artist/0/100';

    constructor(private http: Http) {
    }

    getArtists(): Promise<Artists[]> {
        return this.http.get(this.artistsUrl)
            .toPromise()
            .then(response => response.json() as Artists[])
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('Error!', error);
        return Promise.reject(error.message || error);
    }
}
