import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PlayerService } from '../player.service';
import { Station } from '../radio-stations/station.model';

@Component({
  selector: 'ny-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() station: Station

  @Input() volume: number

  @Output() volumeChanged = new EventEmitter<number>();

  // private volume = 2

  get volumeScaled() {
    // cannot assume that volume will always hold at least zero
    return (this.volume <= 0) ? 0 : this.volume / 10
  }

  ngOnInit() {
  }

  mouseWheelUpFunc(evt: any) {
    console.log(evt)
  }

  mouseWheelDownFunc(evt: any) {
    console.log(evt)
  }

  onVolumeChange(volume: number) {
    this.volumeChanged.emit(volume)
  }

}
