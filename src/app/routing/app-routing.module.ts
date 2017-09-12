/**
 * Created by nursultan on 8/6/17.
 */
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {AuthGuard} from '../services/auth-guard.service';
import {
  ArtistComponent,
  ArtistsComponent,
  FavouriteComponent,
  HomeComponent,
  LoginComponent,
  NewsongsComponent,
  ProfileComponent,
  RandomsongsComponent,
  SongsComponent,
  TopsongsComponent,
  SongComponent
} from '../pages/index';
import {UserRegisterComponent} from '../pages/index';
import {ContactComponent} from "../pages/index";
import {AboutComponent} from "../pages/index";

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
  },
  {
    path: 'song/:uuid',
    component: SongComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent,
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
