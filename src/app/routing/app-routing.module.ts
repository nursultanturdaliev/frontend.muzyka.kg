/**
 * Created by nursultan on 8/6/17.
 */
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {FavouriteComponent} from '../favourite/favourite.component';
import {AuthGuard} from '../services/auth-guard.service';
import {ArtistsComponent} from '../artists/artists.component';
import {SongsComponent} from '../songs/songs.component';
import {TopsongsComponent} from '../topsongs/topsongs.component';
import {NewsongsComponent} from '../newsongs/newsongs.component';
import {RandomsongsComponent} from '../randomsongs/randomsongs.component';
import {ArtistComponent} from '../artist/artist.component';
import {LoginComponent} from '../login/login.component';
import {ProfileComponent} from '../profile/profile.component';
import {UserRegisterComponent} from '../user-register/user-register.component';

const appRoutes:Routes = <Routes>[
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'favourite',
    component: FavouriteComponent, canActivate: [AuthGuard]
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
    component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: UserRegisterComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
