import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';

@Component({
  selector: 'ny-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {
  sliderControl: FormControl = new FormControl(100);

  options: Options = {
    floor: 0,
    ceil: 250
  };

  get volume() {
    return '100$'
  }

  ngOnInit() {
  }

}
