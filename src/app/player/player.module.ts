import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { StationComponent } from './station/station.component';

@NgModule({
  declarations: [PlayerComponent, StationComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
