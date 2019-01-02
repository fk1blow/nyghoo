import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';
import { PlaylistService } from './playlist.service'

@NgModule({
  declarations: [PlaylistComponent],
  providers: [
    PlaylistService
  ],
  imports: [
    CommonModule
  ]
})
export class PlaylistModule { }
