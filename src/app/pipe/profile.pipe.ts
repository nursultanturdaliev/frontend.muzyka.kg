import  {Pipe,PipeTransform} from '@angular/core';
import {ConfigService} from "../services/config.service";

@Pipe(
  {
    name:'profile'
  }
)
export class ProfilePipe implements PipeTransform {
  private relativeDirectory:string = '/uploads/artist/profile/';

  constructor(private configService:ConfigService){}

  public transform(value:string):string {
    if(!value){
      value = 'placeholder_one';
    }
    return this.configService.URL + this.relativeDirectory + value + '.jpg';
  }
}
