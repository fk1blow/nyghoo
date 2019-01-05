import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Channel } from './channels/channel.model';
import { mergeMap, take, map } from 'rxjs/operators';
import { PresetsService } from './presets/presets.service';
import { ChannelsService } from './channels/channels.service';

@Component({
  selector: 'ny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  appReady = false

  playerVolume = new Subject<'Increase' | 'Decrease'>()

  startVolume = 0

  playerPaused?: BehaviorSubject<boolean>

  playerMute = new Subject<boolean>()

  channels?: Channel[]

  selectedChannel?: BehaviorSubject<Channel>

  @ViewChild('appMain') appMain: ElementRef;

  constructor(private presetsService: PresetsService,
    private channelsService: ChannelsService) {}

  onChannelsChange(channel: Channel) {
    this.selectedChannel.next(channel)
    this.playerPaused.next(false)
  }

  ngOnInit() {
    this.presetsService.defaultPresets()
      .pipe(
        mergeMap((presets) =>
          this.channelsService.somafmChannels()
            .pipe(
              map(channels => {
                const chan = channels.find(({ id }) => id === presets.playlist)
                return [presets, channels, chan || channels[0]]
              })
            )
        ),
        take(1) // for now
      )
      .subscribe((res: [Presets, Channel[], Channel]) => {
        const [ presets, channels, selectedChannel ] = res

        this.startVolume = presets.volume
        this.playerPaused = new BehaviorSubject(!presets.autoplay)

        this.channels = channels
        this.selectedChannel = new BehaviorSubject(selectedChannel)

        this.appReady = true
        this.appMain.nativeElement.focus()
      })
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
