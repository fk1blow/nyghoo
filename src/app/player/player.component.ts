import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ny-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mouseWheelUpFunc(evt: any) {
    console.log(evt)
  }

  mouseWheelDownFunc(evt: any) {
    console.log(evt)
  }

}
