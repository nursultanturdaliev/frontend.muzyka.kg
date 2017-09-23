import {Injectable} from '@angular/core';

@Injectable()
export class ShareService {

  public facebook(url:string) {
    return 'https://facebook.com/sharer/sharer.php?u=' + url;
  }

  public twitter(url:string):string {
    return 'https://twitter.com/share?url=' + url;
  }

  public vkontakte(url:string):string {
    return 'https://vk.com/share.php?url=' + url;
  }

  public odnoklassniki(url:string):string {
    return 'https://connect.ok.ru/offer?url' + url;
  }

  public telegram(url:string):string {
    return 'https://telegram.me/share/?url=' + url;
  }

  public whatsapp(url:string):string {
    return 'https://api.whatsapp.com/send?text=' + url;
  }


}
