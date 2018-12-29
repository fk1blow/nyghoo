import { Injectable } from '@angular/core';
import { Station } from './radio-stations/station.model';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor() { }

  getAvailable(): Station[] {
    return [
      {
        name: 'Groove Salad',
        stream: 'http://ice1.somafm.com/groovesalad-128-mp3',
        description: 'A nicely chilled plate of ambient/downtempo beats and grooves.',
        pic: {
          small: 'http://somafm.com/img/groovesalad120.png',
          big: 'groovesalad-400.jpg'
        }
      },

      {
        name: 'Beat Blender',
        stream: 'http://ice1.somafm.com/beatblender-128-mp3',
        description: 'A late night blend of deep-house and downtempo chill.',
        pic: {
          small: 'http://somafm.com/img/blender120.png',
          big: 'beatblender-400.jpg'
        }
      },

      {
        name: 'Drone Zone',
        stream: 'http://ice1.somafm.com/dronezone-128-mp3',
        playlist: 'http://somafm.com/songs/dronezone.xml',
        description: 'Served best chilled, safe with most medications. Atmospheric textures with minimal beats.',
        pic: {
          small: 'https://api.somafm.com/img/dronezone120.jpg',
          big: 'dronezone-400.jpg'
        }
      },

      {
        name: 'Left Coast 70s',
        description: 'Mellow album rock from the Seventies. Yacht not required.',
        stream: 'http://ice1.somafm.com/seventies-128-mp3',
        pic: {
          small: 'http://somafm.com/img/seventies120.jpg',
          big: 'seventies400.jpg'
        }
      },

      {
        name: 'Deep Space One',
        description: 'Deep ambient electronic, experimental and space music. For inner and outer space exploration.',
        stream: 'http://ice3.somafm.com/deepspaceone-128-mp3',
        pic: {
          small: 'https://api.somafm.com/img/deepspaceone120.gif',
          big: 'deepspaceone-400.jpg'
        }
      }
    ]
  }

}
