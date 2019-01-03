import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Station } from './channels/station.model';
import { Subject } from 'rxjs';
import { Channel } from './channels/channel.model';
import { ChannelsMetaService } from './channels-meta.service';

@Component({
  selector: 'ny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  playerVolume = 2

  playerVolumePrev: number | null = null

  playerPaused = true

  channel: Subject<Channel> = new Subject()

  availableStations?: Station[]

  @ViewChild('appMain') appMain: ElementRef;

  constructor(private channelsMeta: ChannelsMetaService) {}

  onChannelChange(channel: Channel) {
    this.channel.next(channel)

    if (this.playerPaused) {
      this.playerPaused = false
    }
  }

  ngOnInit() {
    // this.channelsMeta
    this.appMain.nativeElement.focus()
  }

  onKeyUp(evt: KeyboardEvent) {
    //
  }

  onKeyDown(evt: KeyboardEvent) {
    const UP = 38
    const DOWN = 40
    const SPACE = 32
    const ESC = 27
    const RIGHT = 39
    const LEFT = 37

    switch (evt.keyCode) {
      case UP:
        this.playerVolumePrev = null
        if (this.playerVolume < 10) {
          this.playerVolume = this.playerVolume + 1
        }
        break;

      case DOWN:
        this.playerVolumePrev = null
        if (this.playerVolume > 0) {
          this.playerVolume = this.playerVolume - 1
        }
        break;

      case SPACE:
        this.playerPaused = !this.playerPaused
        break;

      case ESC:
        if (this.playerVolumePrev !== null) {
          this.playerVolume = this.playerVolumePrev
          this.playerVolumePrev = null
        } else {
          this.playerVolumePrev = this.playerVolume
          this.playerVolume = 0
        }
        break;

      // case LEFT:
      //   this.station.next(this.availableStations[Math.floor(Math.random() * 4)])
      //   break;

      // case RIGHT:
      //   this.station.next(this.availableStations[Math.floor(Math.random() * 4)])
      //   break;
    }
  }

  onPlayerVolumeChange(volume: number) {
    this.playerVolume = volume
  }

}
