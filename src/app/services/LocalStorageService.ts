import {Injectable} from '@angular/core';
import {Http, Headers,RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { URLSearchParams } from '@angular/http';
import {ConfigService} from "./config.service";
import {BaseService} from "./BaseService";
import {Song} from '../Models/song';
import {Favourite} from 'app/Models/Favourite';
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class LocalStorageService {


  public  setLocalFavorites(favorites){

    for(var i = 0, len = favorites['songs'].length; i < len; i++){
      localStorage.setItem(favorites['songs'][i]['id'].toString(), '1');
    }
  }

  public isFavorite(index : number){
    return localStorage.getItem(index.toString()) ? true : false;
  }

  public addFavorite(index : number){
    localStorage.setItem(index.toString(), '1')
  }

  public removeFavorite(index : number){
    localStorage.removeItem(index.toString());
  }
}
