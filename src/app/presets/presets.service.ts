import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresetsService {

  constructor() { }

  defaultPresets(): Observable<Presets> {
    return of({
      autoplay: false,
      playlist: 'groovesalad',
      volume: 3,
    })
  }

}
