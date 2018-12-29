import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ny-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {

  @Input() name: string

  constructor() { }

  ngOnInit() {
  }

}
