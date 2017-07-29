import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ArtistsComponent} from './artists/artists.component';
import {SongsComponent} from './songs/songs.component';
import {PlayerComponent} from './player/player.component';
import {AlertModule} from 'ng2-bootstrap';
import {PlayerService} from './player.service';
import {ArtistComponent} from './artist/artist.component';
import {ArtistService} from './artist.service';
import {SongsService} from "./songs.service";
import { TopsongsComponent } from './topsongs/topsongs.component';
import { NewsongsComponent } from './newsongs/newsongs.component';
import {RandomsongsComponent} from "./randomsongs/randomsongs.component";
import {ConfigService} from "./services/config.service";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HomeComponent } from './home/home.component';
import {FilterPipeModule} from "ngx-filter-pipe/dist/src/ngx-filter.module";
import {LazyLoadImageModule} from "ng-lazyload-image/index";
import { SongListComponent } from './song-list/song-list.component';
import { SongListRowBasedComponent } from './song-list-row-based/song-list-row-based.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./services/auth.service";
import { ProfileComponent } from './profile/profile.component';

const appRoutes:Routes = <Routes>[
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'artists',
    component: ArtistsComponent,
  },
  {
    path: 'songs',
    component: SongsComponent,
  },
  {
    path: 'topsongs',
    component: TopsongsComponent,
  },
  {
    path: 'newsongs',
    component: NewsongsComponent,
  },
  {
    path: 'randomsongs',
    component: RandomsongsComponent,
  },
  {
    path: 'artist/:id',
    component: ArtistComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    SongsComponent,
    PlayerComponent,
    ArtistComponent,
    TopsongsComponent,
    NewsongsComponent,
    RandomsongsComponent,
    HomeComponent,
    SongListComponent,
    SongListRowBasedComponent,
    LoginComponent,
    ProfileComponent
  ],

  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    InfiniteScrollModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FilterPipeModule,
    LazyLoadImageModule
  ],
  providers: [PlayerService, ArtistService, SongsService, ConfigService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
