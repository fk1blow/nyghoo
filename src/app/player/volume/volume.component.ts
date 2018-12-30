import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';

interface SimpleSliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'ny-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {

  @Input() start: number

  @Input() value: number

  @Output() changed = new EventEmitter<number>();

  volumeReady = false

  sliderControl: FormControl = new FormControl(0);

  sliderOptions = {
    floor: 0,
    ceil: 10,
    vertical: true,
    keyboardSupport: false,
    mouseSupport: true
  };

  onUserChange(event) {
    this.changed.emit(event.value)
  }

  onUserChangeEnd() {
    console.log('end???')
  }

  ngOnInit() {
    this.sliderControl.setValue(this.start)
    this.volumeReady = true
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if ((changes.value.currentValue as number) !== changes.value.previousValue) {
      this.sliderControl.setValue(changes.value.currentValue)
    }
  }

}
