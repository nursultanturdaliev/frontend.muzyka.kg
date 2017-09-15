import {Component, ElementRef, ViewChild, Renderer} from '@angular/core';
import {PlayerService} from './services/player.service';
import {SongService} from './services/song.service';
import {AuthService} from './services/auth.service';
import {FacebookService, InitParams} from 'ngx-facebook';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SongService]
})

export class AppComponent {
  @ViewChild('toggleBtn') toggleBtn: ElementRef;

  constructor(public playerService: PlayerService,
              public authService: AuthService,
              private fb: FacebookService,
              private router: Router,
              private renderer: Renderer) {
    const initParams: InitParams = {
      appId: '1974598029436106',
      cookie: true,
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);

  }

  public menuItemClick() {
    this.renderer.invokeElementMethod(this.toggleBtn.nativeElement, 'click');
    console.log(this.toggleBtn);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
