import {Component, ElementRef, ViewChild, Renderer} from '@angular/core';
import {PlayerService} from './services/player.service';
import {SongService} from './services/song.service';
import {AuthService} from './services/auth.service';
import {FacebookService, InitParams} from 'ngx-facebook';
import {Router} from '@angular/router';
import {FavouriteService} from "./services/favourite.service";
import {LocalStorageService} from "./services/LocalStorageService";
import {Store} from '@ngrx/store';
import {Song} from "./Models/song";
import {Observable} from 'rxjs/Observable';
import {Player} from "./Models/player";
export interface AppState {
  player:Player
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SongService]
})
export class AppComponent {
  @ViewChild('toggleBtn') toggleBtn:ElementRef;

  public player:Observable<Player>;
  private subscription;

  constructor(public playerService:PlayerService,
              public authService:AuthService,
              private fb:FacebookService,
              private router:Router,
              private renderer:Renderer,
              private localStorageService : LocalStorageService,
  private _store:Store<AppState>) {
    const initParams:InitParams = {
      appId: '1974598029436106',
      cookie: true,
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);

    this.player = this._store.select('player');
  }

  public menuItemClick() {
    this.renderer.invokeElementMethod(this.toggleBtn.nativeElement, 'click');
    console.log(this.toggleBtn);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
