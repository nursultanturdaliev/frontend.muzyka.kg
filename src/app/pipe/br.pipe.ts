import {Pipe,PipeTransform} from '@angular/core';
@Pipe({
  name: 'br'
})
export class BrPipe implements PipeTransform {
  transform(value:any):any {
    if (!value || typeof value !== 'string') {
      return value;
    }
    return value.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }
}
