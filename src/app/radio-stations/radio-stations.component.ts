import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Station } from './station.model'
import { StationsService } from '../stations.service';

@Component({
  selector: 'ny-radio-stations',
  templateUrl: './radio-stations.component.html',
  styleUrls: ['./radio-stations.component.scss']
})
export class RadioStationsComponent implements OnInit {

  @Input() stations: Station[]

  @Output() changed = new EventEmitter<Station>();

  selectedStation?: Station

  ngOnInit() {
    this.selectedStation = this.stations[0]
  }

  onChangeStation(station: Station) {
    if (this.selectedStation && this.selectedStation.name === station.name) {
      return;
    }

    this.selectedStation = station
    this.changed.emit(this.selectedStation)
  }

}
