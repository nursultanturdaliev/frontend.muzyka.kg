import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {AlertModule} from 'ng2-bootstrap';
import {PlayerService} from './services/player.service';
import {ArtistService} from './services/artist.service';
import {SongService} from './services/song.service';
import {ConfigService} from './services/config.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {FilterPipeModule} from 'ngx-filter-pipe/dist/src/ngx-filter.module';
import {LazyLoadImageModule} from 'ng-lazyload-image/index';
import {AuthService} from './services/auth.service';
import {FavouriteService} from './services/favourite.service';
import {AuthModule} from './auth.module';
import {AuthGuard} from './services/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HistoryService} from './services/history.service';
import {AppService} from './services/app.service';
import {ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './routing/app-routing.module';

import { ArtistInfoComponent } from './components/index';
import { MySongsComponent } from './components/index';
import {PlayerComponent} from './components/index';
import { SongListComponent } from './components/index';
import { SongListRowBasedComponent } from './components/index';
import { HistoryListComponent } from './components/index';
import {UserFormComponent} from "./components/index";

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
import {ToastrConfig} from "ngx-toastr/index";
import {UserService} from "./services/user.service";

import { FacebookModule } from 'ngx-facebook';
import {GoogleService} from "./services/GoogleService";
import {AuthGoogleService} from "./services/AuthGoogleService";


@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    ArtistInfoComponent,
    ArtistsComponent,
    FavouriteComponent,
    HistoryListComponent,
    HomeComponent,
    LoginComponent,
    MySongsComponent,
    NewsongsComponent,
    PlayerComponent,
    ProfileComponent,
    RandomsongsComponent,
    SongListComponent,
    SongListRowBasedComponent,
    SongsComponent,
    TopsongsComponent,
    UserFormComponent,
    UserRegisterComponent
  ],

  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FacebookModule.forRoot(),
    FilterPipeModule,
    FormsModule,
    InfiniteScrollModule,
    HttpModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(<ToastrConfig>{
      timeOut: 5000,
      closeButton: true,
      progressBar: false,
      maxOpened: 3,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    AppService,
    ArtistService,
    AuthGuard,
    AuthService,
    ConfigService,
    FavouriteService,
    HistoryService,
    SongService,
    PlayerService,
    UserService,
    GoogleService,
    AuthGoogleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
