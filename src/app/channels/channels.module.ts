import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelsComponent } from './channels.component';
import { ChannelsService } from './channels.service'

@NgModule({
  declarations: [
    ChannelsComponent
  ],
  providers: [
    ChannelsService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChannelsComponent
  ]
})
export class ChannelsModule { }
