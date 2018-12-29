import { Component, OnInit } from '@angular/core';
import { Station } from './radio-stations/station.model';
import { StationsService } from './stations.service';

@Component({
  selector: 'ny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  playerVolume = 2
  playerPaused = false
  station?: Station
  availableStations?: Station[]

  constructor(private stationsService: StationsService) { }

  onStationChange(station: Station) {
    this.station = station
    if (this.playerPaused) {
      this.playerPaused = false
    }
  }

  ngOnInit() {
    this.availableStations = this.stationsService.getAvailable()
    this.station = this.availableStations[0]
  }

  onKeyUp(evt: KeyboardEvent) {
    const UP = 38
    const DOWN = 40
    const SPACE = 32

    switch (evt.keyCode) {
      case UP:
        if (this.playerVolume < 10) {
          this.playerVolume = this.playerVolume + 1
        }
        break;

      case DOWN:
        if (this.playerVolume > 0) {
          this.playerVolume = this.playerVolume - 1
        }
        break;

      case SPACE:
        this.playerPaused = !this.playerPaused
        break;
    }
  }

  onPlayerVolumeChange(volume: number) {
    this.playerVolume = volume
  }

}
