import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor() { }

  somafmStations() {
    return [
      {
        name: 'Groove Salad',
        stream: 'http://ice1.somafm.com/groovesalad-128-mp3',
        description: 'A nicely chilled plate of ambient/downtempo beats and grooves.',
        pic: {
          small: 'http://somafm.com/img/groovesalad120.png'
        }
      },

      {
        name: 'Beat Blender',
        stream: 'http://ice3.somafm.com/beatblender-128-mp3',
        description: 'A late night blend of deep-house and downtempo chill.',
        pic: {
          small: 'http://somafm.com/img/blender120.png'
        }
      },

      {
        name: 'Left Coast 70s',
        description: 'Mellow album rock from the Seventies. Yacht not required.',
        stream: 'http://ice3.somafm.com/seventies-128-mp3',
        pic: {
          small: 'http://somafm.com/img/seventies120.jpg'
        }
      },
    ]
  }

}
