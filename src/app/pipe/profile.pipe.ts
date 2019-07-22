import  {Pipe,PipeTransform} from '@angular/core';
import {ConfigService} from "../services/config.service";

@Pipe(
  {
    name:'profile'
  }
)
export class ProfilePipe implements PipeTransform {

  public transform(value:string):string {
    if(!value){
      value = 'placeholder_one';
    }
    return 'http://api-muzyka.aio.kg/uploads/artist/profile/' + value + '.jpg';

    //return 'https://storage.googleapis.com/muzykakg/'+ value + '.jpg';
  }
}
