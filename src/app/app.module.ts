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

const appRoutes: Routes = [
  {
    path: 'artists',
    component: ArtistsComponent,
  },
  {
    path: 'songs',
    component: SongsComponent,
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
    ArtistComponent
  ],

  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PlayerService, ArtistService, SongsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
