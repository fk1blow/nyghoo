import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
// import { VolumeModule } from './volume/volume.module'
import { PlayerModule } from './player/player.module';
import { RadioStationsModule } from './radio-stations/radio-stations.module';
import { WindowControlsComponent } from './window-controls/window-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowControlsComponent,
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    // VolumeModule,
    PlayerModule,
    RadioStationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
