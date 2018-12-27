import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VolumeModule } from './volume/volume.module'
import { PlayerModule } from './player/player.module';
import { RadioStationsModule } from './radio-stations/radio-stations.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    VolumeModule,
    PlayerModule,
    RadioStationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
