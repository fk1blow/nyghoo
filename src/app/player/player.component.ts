import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../player.service';
import { Station } from '../radio-stations/station.model';

@Component({
  selector: 'ny-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() station: Station

  private volume = 2

  get volumeScaled() {
    return (this.volume === 0) ? 0 : this.volume / 10
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
    this.volume = volume
  }

}
