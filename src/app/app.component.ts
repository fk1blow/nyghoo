import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Station } from './channels/station.model';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { Channel } from './channels/channel.model';
import { share, publish } from 'rxjs/operators';

@Component({
  selector: 'ny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // TODO maybe define a `Presets` module and service
  private presets = {
    autoplay: false,
    playlist: 'deepspaceone',
    volume: 3,
  }

  playerVolume = new Subject<'Increase' | 'Decrease'>()

  playerPaused = new BehaviorSubject<boolean>(!this.presets.autoplay)

  playerMute = new Subject<boolean>()

  channel?: BehaviorSubject<Channel> = new BehaviorSubject<Channel>()
  // channel?: BehaviorSubject<Channel> = new BehaviorSubject<Channel>()

  availableStations?: Station[]

  @ViewChild('appMain') appMain: ElementRef;

  onChannelsChange(channel: Channel) {
    this.channel.next(channel)
    this.playerPaused.next(false)
  }

  onChannelsLoaded(channels: Channel[]) {
    const presetChannel = channels.find(({ id }) => id === this.presets.playlist)
    this.channel.next(presetChannel || channels[0])
  }

  ngOnInit() {
    this.appMain.nativeElement.focus()
    this.playerPaused.next(!this.presets.autoplay)
  }

  onKeyDown(evt: KeyboardEvent) {
    const UP = 38
    const DOWN = 40
    const SPACE = 32
    const ESC = 27

    switch (evt.keyCode) {
      case UP:
        this.playerVolume.next('Increase')
        break;

      case DOWN:
        this.playerVolume.next('Decrease')
        break;

      case SPACE:
        this.playerPaused.next(!this.playerPaused.value)
        break;

      case ESC:
        this.playerMute.next()
        break;
    }
  }

}
