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

  availableStations?: Station[]

  constructor(private stationsService: StationsService) { }

  onStationChange(station: Station) {
    this.station = station
  }

  ngOnInit() {
    this.availableStations = this.stationsService.somafmStations()
    this.station = this.availableStations[0]
  }

}
