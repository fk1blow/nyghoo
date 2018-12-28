import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { StationComponent } from './station/station.component';
import { VolumeComponent } from './volume/volume.component';
import { MouseWheelDirective } from '../mousewheel.directive';

@NgModule({
  declarations: [
    MouseWheelDirective,
    PlayerComponent,
    StationComponent,
    VolumeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlayerComponent,
  ]
})
export class PlayerModule { }
