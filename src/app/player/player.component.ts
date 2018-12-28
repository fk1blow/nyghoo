import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';

interface SimpleSliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'ny-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  sliderControl: FormControl = new FormControl(0);

  volumeControl: SimpleSliderModel = {
    value: 0,
    options: {
      floor: 0,
      ceil: 11,
      vertical: true,
    }
  };

  constructor() { }

  ngOnInit() {
  }

  dragEnd(event) {
    console.log('Element was dragged', event);
  }

  mouseWheelUpFunc(evt: any) {
    console.log(evt)
  }

  mouseWheelDownFunc(evt: any) {
    console.log(evt)
  }

}
