import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { PlayerComponent } from './player.component';
import { StationComponent } from './station/station.component';
import { VolumeComponent } from './volume/volume.component';
import { MouseWheelDirective } from '../mousewheel.directive';
import { PlaylistComponent } from './playlist/playlist.component'


@NgModule({
  declarations: [
    MouseWheelDirective,
    PlayerComponent,
    StationComponent,
    VolumeComponent,
    PlaylistComponent
  ],
  imports: [
    CommonModule,
    Ng5SliderModule,
    ReactiveFormsModule
  ],
  exports: [
    PlayerComponent,
  ]
})
export class PlayerModule { }
