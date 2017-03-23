import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Songs} from "./songs";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SongsService {

    private songUrl = 'http://obon.aio.kg/api/song/0/100';

    constructor(private http: Http) {
    }

    getSongs(): Promise<Songs[]> {
        return this.http.get(this.songUrl)
            .toPromise()
            .then(response => response.json() as Songs[])
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('Error!', error);
        return Promise.reject(error.message || error);
    }

}
