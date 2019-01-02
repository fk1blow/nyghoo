import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
import { PlayerModule } from './player/player.module';
import { ChannelsModule } from './channels/channels.module';
import { ChannelsMetaService } from './channels-meta.service'
import { WindowControlsComponent } from './window-controls/window-controls.component';

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
    ChannelsModule
  ],
  providers: [ChannelsMetaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
