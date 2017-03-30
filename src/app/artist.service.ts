import {Injectable} from '@angular/core';
import {Artist} from "./artist";
import {Http} from "@angular/http";

@Injectable()
export class ArtistService {

  private artistUrl = 'http://localhost:8000/api/artist/';

  constructor(private http: Http) {
  }

  getArtist(artistId): Promise<Artist> {
    return this.http.get(this.artistUrl + artistId)
      .toPromise()
      .then(response => response.json() as Artist)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('Error!', error);
    return Promise.reject(error.message || error);
  }
}
