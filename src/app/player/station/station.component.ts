import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ny-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {

  @Input() name: string
  @Input() description: string
  @Input() pic: string

  constructor() { }

  get stationPic() {
    return `../../assets/images/${this.pic}`
  }

  ngOnInit() {
  }

}
