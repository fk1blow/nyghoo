import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
import { PlayerModule } from './player/player.module';
import { PresetsModule } from './presets/presets.module';
import { ChannelsModule } from './channels/channels.module';
import { ChannelsMetaService } from './channels-meta.service'
import { WindowControlsComponent } from './window-controls/window-controls.component';
import { PresetsService } from './presets/presets.service';
import { ChannelsService } from './channels/channels.service'

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
    ChannelsModule,
    PresetsModule
  ],
  providers: [ChannelsMetaService, PresetsService, ChannelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
