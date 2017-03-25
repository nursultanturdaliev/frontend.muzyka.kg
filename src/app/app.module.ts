import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ArtistsComponent} from './artists/artists.component';
import { SongsComponent } from './songs/songs.component';
import { PlayerComponent } from './player/player.component';
import { AlertModule } from 'ng2-bootstrap';

const appRoutes: Routes = [
    {
        path: 'artists',
        component: ArtistsComponent,
        // outlet: 'songs'
    },
    {
        path: 'songs',
        component: SongsComponent,
        // outlet: 'artists'
    }
]

@NgModule({
    declarations: [
        AppComponent,
        ArtistsComponent,
        SongsComponent,
        PlayerComponent
    ],

    imports: [
        AlertModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent, PlayerComponent]
})
export class AppModule {
}
