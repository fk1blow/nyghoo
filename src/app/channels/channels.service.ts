import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Channel } from './channel.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(private http: HttpClient) {}

  somafmChannels(): Observable<Channel[]> {
    return this.http
      .get('http://api.somafm.com/channels.json')
      .pipe(
        map((response: { channels: Array<{}> }) => response.channels as Channel[]),
        map(channels => channels.sort((a, b) =>
          parseInt(a.listeners, 10) < parseInt(b.listeners, 10) ? 0 : -1))
      )
  }

}
