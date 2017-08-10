import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {PlayerComponent} from './player/player.component';
import {AlertModule} from 'ng2-bootstrap';
import {PlayerService} from './services/player.service';
import {ArtistService} from './services/artist.service';
import {SongService} from './services/song.service';
import {ConfigService} from './services/config.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {FilterPipeModule} from 'ngx-filter-pipe/dist/src/ngx-filter.module';
import {LazyLoadImageModule} from 'ng-lazyload-image/index';
import { SongListComponent } from './song-list/song-list.component';
import { SongListRowBasedComponent } from './song-list-row-based/song-list-row-based.component';
import {AuthService} from './services/auth.service';
import {FavouriteService} from './services/favourite.service';
import {AuthModule} from './auth.module';
import {AuthGuard} from './services/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HistoryService} from './services/history.service';
import {AppService} from './services/app.service';
import { HistoryListComponent } from './history-list/history-list.component';
import {ReactiveFormsModule } from '@angular/forms';
import { MySongsComponent } from './my-songs/my-songs.component';
import { ArtistInfoComponent } from './artist-info/artist-info.component';
import {AppRoutingModule} from './routing/app-routing.module';

import {UserRegisterComponent } from './pages/index';
import { ProfileComponent } from './pages/index';
import { FavouriteComponent } from './pages/index';
import { HomeComponent } from './pages/index';
import {ArtistComponent} from './pages/index';
import { LoginComponent } from './pages/index';
import { TopsongsComponent } from './pages/index';
import { NewsongsComponent } from './pages/index';
import {SongsComponent} from './pages/index';
import {ArtistsComponent} from './pages/index';
import {RandomsongsComponent} from './pages/index';


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
    ProfileComponent,
    FavouriteComponent,
    HistoryListComponent,
    UserRegisterComponent,
    MySongsComponent,
    ArtistInfoComponent
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FilterPipeModule,
    LazyLoadImageModule,
    AuthModule,
    ToastrModule.forRoot({timeOut: 5000, closeButton: true, progressBar: true}),
    BrowserAnimationsModule
  ],
  providers: [
    PlayerService,
    ArtistService,
    SongService,
    ConfigService,
    AuthService,
    FavouriteService,
    HistoryService,
    AuthGuard,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
