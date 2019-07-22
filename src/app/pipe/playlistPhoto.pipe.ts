import  {Pipe,PipeTransform} from '@angular/core';
import {ConfigService} from "../services/config.service";

@Pipe(
  {
    name:'playlistPhoto'
  }
)
export class PlaylistPipe implements PipeTransform {

  public transform(value:string):string {
    if(!value){
      value = 'placeholder_one';
    }
    return 'https://storage.googleapis.com/muzykakg/playlist/'+ value + '.jpg';
  }
}
