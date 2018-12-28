import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ny-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {
  constructor() { }

  get volume() {
    return '100$'
  }

  ngOnInit() {
  }

}
