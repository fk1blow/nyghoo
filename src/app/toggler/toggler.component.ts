import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ny-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.css']
})
export class TogglerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('hello electron')
  }

}
