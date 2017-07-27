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
import {SearchComponent} from './search/search.component';
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

const appRoutes:Routes = [
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
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'artist/:id',
    component: ArtistComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    SongsComponent,
    PlayerComponent,
    SearchComponent,
    ArtistComponent,
    TopsongsComponent,
    NewsongsComponent,
    RandomsongsComponent
  ],

  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    InfiniteScrollModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PlayerService, ArtistService, SongsService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
