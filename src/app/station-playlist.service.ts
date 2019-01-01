import { Injectable } from '@angular/core';
import { timer, of, Observable } from 'rxjs';
import { switchMap, map, mergeMap, catchError, pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { xml2json } from 'xml-js'
import { Playlist } from './radio-stations/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class StationPlaylistService {

  constructor(private http: HttpClient) {}

  follow(playlistUrl: string): Observable<Playlist> {
    const SEC = 1000
    const parserOpts = {
      compact: true,
      alwaysChildren: false,
      ignoreAttributes: true,
      cdataKey: 'text'
    }

    return of(playlistUrl)
      .pipe(
        switchMap(url =>
          timer(0, 30 * SEC).pipe(
            mergeMap(_ => this.fetchPlaylist(url)),
            map((playlistXml: string) => JSON.parse(xml2json(playlistXml, parserOpts))),
            pluck('songs', 'song')
          )
        )
      )
  }

  private fetchPlaylist(url: string) {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(catchError((err) => of(err)))
  }
}
