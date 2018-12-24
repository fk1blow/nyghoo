import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor() { }

  stationsList() {
    return [
      {
        name: 'Groove Salad',
        pic: {
          small: 'http://somafm.com/img/groovesalad120.png'
        }
      },

      {
        name: 'Beat Blender',
        pic: {
          small: 'http://somafm.com/img/blender120.png'
        }
      },

      {
        name: 'Left Coast 70s',
        pic: {
          small: 'http://somafm.com/img/seventies120.jpg'
        }
      },
    ]
  }

}
