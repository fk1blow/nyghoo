import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
import { PlayerModule } from './player/player.module';
import { RadioStationsModule } from './radio-stations/radio-stations.module';
import { WindowControlsComponent } from './window-controls/window-controls.component';
import { StationsService } from './stations.service';
import { StationPlaylistService } from './station-playlist.service'

@NgModule({
  declarations: [
    AppComponent,
    WindowControlsComponent,
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    HttpClientModule,
    PlayerModule,
    RadioStationsModule
  ],
  providers: [StationsService, StationPlaylistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
