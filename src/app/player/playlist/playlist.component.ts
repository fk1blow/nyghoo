import { Component, OnInit, Input } from '@angular/core';
import { Channel } from 'src/app/channels/channel.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mergeMap, catchError, map, pluck, switchMap, filter } from 'rxjs/operators';
import { xml2json } from 'xml-js'
import { ChannelsMetaService } from 'src/app/channels-meta.service';
import { ChannelUpdate } from 'src/app/channels/channel-update.model';

@Component({
  selector: 'ny-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() channel: Observable<Channel>

  private playlist: any[] = []

  constructor(private http: HttpClient, private channelMeta: ChannelsMetaService) { }

  ngOnInit() {
    const parserOpts = {
      compact: true,
      alwaysChildren: false,
      ignoreAttributes: true,
      cdataKey: 'text'
    }

    // when the 'channel' emits, fetch the songs for this stations
    this.channel.pipe(
      map((chan: Channel) => chan.id),

      mergeMap((id: string) =>
        this.http
          .get(`http://somafm.com/songs/${id}.xml`, { responseType: 'text' })
          .pipe(
            map((playlistXml: string) => JSON.parse(xml2json(playlistXml, parserOpts))),

            pluck('songs', 'song'),

            map((pls: Array<{title: {text: string}, artist: {text: string}}>) =>
              pls.map(item => `${item.artist.text} - ${item.title.text}`)),

            catchError((err) => of(err)))
      )
    )
    .subscribe(
      (playlist) => this.playlist = playlist
    )

    // when the `channel` emits, start listening to channel meta updates
    // and modify the `playlist` accordingly
    this.channel
      .pipe(
        map((chan: Channel) => chan.id),

        switchMap((id: string) => {
          return this.channelMeta.updates$
            .pipe(filter((update: any) => update.station === id))
        })
      )
      .subscribe((update: ChannelUpdate) => {
        const songFromMetaPls: string = update.data['StreamTitle']
        const songInCurrentPls: string = this.playlist[0]

        if (songInCurrentPls !== songFromMetaPls)
          this.playlist.unshift(songFromMetaPls)
      })
  }

}
