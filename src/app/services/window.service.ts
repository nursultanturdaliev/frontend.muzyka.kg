import {Injectable} from '@angular/core';

function _window():any {
  return window;
}

@Injectable()
export class Window {
  get nativeWindow():any {
    return _window();
  }

  get isMobile():boolean {
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(_window().navigator.userAgent) )
  }
}
