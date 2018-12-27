import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';

@Component({
  selector: 'ny-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.scss']
})
export class TogglerComponent implements OnInit {

  indexToggle = 0

  currentlyPlaying: { name: string, pic: { small: string, big?: string } }

  constructor(private stationsService: StationsService) {
    this.commuteStation(0)
  }

  ngOnInit() {
    console.log('hello electron')
    console.log(this.stationsService.stationsList())
  }

  handleToggle() {
    if (this.indexToggle > 1) {
      this.indexToggle = 0
    } else {
      this.indexToggle += 1
    }
    this.commuteStation(this.indexToggle)
  }

  private commuteStation(index: number) {
    const stations = this.stationsService.stationsList()
    this.currentlyPlaying = stations[index]
  }

}
