import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {ArtistComponent} from './artist/artist.component';

@NgModule({
    declarations: [
        AppComponent,
        ArtistComponent
    ],

    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: 'artists',
                component: ArtistComponent
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
