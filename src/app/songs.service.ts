import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Song} from "./song";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SongsService {

    private songUrl = 'http://localhost:8000/api/song/0/100';

    constructor(private http: Http) {}

    getSongs(): Promise<Song[]> {
        return this.http.get(this.songUrl)
            .toPromise()
            .then(response => response.json() as Song[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error!', error);
        return Promise.reject(error.message || error);
    }

}
