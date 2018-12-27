import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeComponent } from './volume.component';

@NgModule({
  declarations: [VolumeComponent],
  imports: [
    CommonModule
  ],
  exports: [
    VolumeComponent
  ]
})
export class VolumeModule { }
