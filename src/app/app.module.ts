import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
import { PlayerModule } from './player/player.module';
import { RadioStationsModule } from './radio-stations/radio-stations.module';
import { WindowControlsComponent } from './window-controls/window-controls.component';
import { StationsService } from './stations.service';

@NgModule({
  declarations: [
    AppComponent,
    WindowControlsComponent,
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    PlayerModule,
    RadioStationsModule
  ],
  providers: [StationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
