import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Station } from './radio-stations/station.model';
import { StationsService } from './stations.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  playerVolume = 2

  playerPaused = false

  station?: BehaviorSubject<Station | null>

  availableStations?: Station[]

  @ViewChild('appMain') appMain: ElementRef;

  constructor(private stationsService: StationsService) {}

  onStationChange(station: Station) {
    this.station.next(station)

    if (this.playerPaused) {
      this.playerPaused = false
    }
  }

  ngOnInit() {
    this.availableStations = this.stationsService.getAvailable()
    this.appMain.nativeElement.focus()
    this.station = new BehaviorSubject(this.availableStations[0])
  }

  onKeyUp(evt: KeyboardEvent) {
    //
  }

  onKeyDown(evt: KeyboardEvent) {
    const UP = 38
    const DOWN = 40
    const SPACE = 32
    const ESC = 27
    const RIGHT = 39
    const LEFT = 37

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

      case ESC:
        this.playerVolume = 0
        break;

      // case LEFT:
      //   this.station.next(this.availableStations[Math.floor(Math.random() * 4)])
      //   break;

      // case RIGHT:
      //   this.station.next(this.availableStations[Math.floor(Math.random() * 4)])
      //   break;
    }
  }

  onPlayerVolumeChange(volume: number) {
    this.playerVolume = volume
  }

}
