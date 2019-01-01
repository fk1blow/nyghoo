import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Channel } from './channel.model';

@Injectable()
export class ChannelsService {

  constructor(private http: HttpClient) {}

  getChannels(): Observable<Channel[]> {
    return this.http
      .get('http://api.somafm.com/channels.json')
      .pipe(
        map((response: { channels: Array<{}> }) => response.channels),

        map((channels: any[]) => channels.map(channel => ({
          id: channel.id,
          title: channel.title,
          description: channel.description,
          dj: channel.dj,
          genre: channel.genre,
          image: channel.image,
          largeimage: channel.largeimage,
          xlimage: channel.xlimage,
          listeners: channel.listeners
        })))
      )
  }

}
