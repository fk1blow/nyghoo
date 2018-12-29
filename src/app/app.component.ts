import { Component, OnInit } from '@angular/core';
import { Station } from './radio-stations/station.model';
import { StationsService } from './stations.service';

@Component({
  selector: 'ny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  station?: Station

  volume = 2

  availableStations?: Station[]

  constructor(private stationsService: StationsService) { }

  onStationChange(station: Station) {
    this.station = station
  }

  ngOnInit() {
    this.availableStations = this.stationsService.getAvailable()
    this.station = this.availableStations[0]
  }

  onKeyUp(evt: KeyboardEvent) {
    const UP = 38
    const DOWN = 40

    switch (evt.keyCode) {
      case UP:
        if (this.volume < 10) {
          this.volume = this.volume + 1
        }
        break;
      case DOWN:
        if (this.volume > 0) {
          this.volume = this.volume - 1
        }
        break;
    }
  }

  onPlayerVolumeChange(volume: number) {
    this.volume = volume
  }

}
