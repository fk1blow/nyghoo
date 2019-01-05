import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges, ElementRef, OnChanges } from '@angular/core';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { Channel } from '../channels/channel.model';
import { filter, mergeMap, scan, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'ny-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  audio: HTMLAudioElement = new Audio()

  sliderValue = 0

  unmuteVolume: number | undefined = undefined

  @Input() channel: BehaviorSubject<Channel>

  @Input() volumeChanges: Observable<'Increase' | 'Decrease'>

  @Input() paused: BehaviorSubject<boolean>

  @Input() toggleMute: Observable<boolean>

  @Input() volume = 2

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  ngOnInit() {
    this.audio.volume = (this.volume > 0 ? this.volume / 10 : 0)
    this.sliderValue = this.audio.volume * 10

    // pausing changes

    this.paused
      .pipe(filter(paused => !paused))
      .subscribe(_ => {
        const channel = this.channel.value
        this.audio.src = `http://localhost:3000/audio/somafm/${channel.id}`
        this.audio.play()
      })

    this.paused
      .pipe(filter(paused => paused))
      .subscribe(_ => {
        this.audio.pause()
        this.audio.src = ''
      })

    // volume changes

    this.volumeChanges.pipe(
      filter(v => v === 'Increase')
    )
      .subscribe(v => {
        const scaled = this.audio.volume * 10

        if (scaled < 10) {
          this.audio.volume = (scaled + 1) / 10
          this.sliderValue = scaled + 1
          this.unmuteVolume = undefined
        }
      })

    this.volumeChanges.pipe(
      filter(v => v === 'Decrease')
    )
      .subscribe(v => {
        const scaled = this.audio.volume * 10

        if (scaled > 0) {
          this.audio.volume = (scaled - 1) / 10
          this.sliderValue = scaled - 1
          this.unmuteVolume = undefined
        }
      })

    // mute changes

    this.toggleMute.subscribe(() => {
      const isMuted = !(this.audio.volume > 0)

      if (isMuted && this.unmuteVolume) {
        this.audio.volume = this.unmuteVolume
        this.sliderValue = this.audio.volume * 10
        this.unmuteVolume = undefined
      } else {
        this.unmuteVolume = this.audio.volume
        this.audio.volume = 0
        this.sliderValue = 0
      }
    })
  }

  onVolumeChange(volume: number) {
    this.audio.volume = volume / 10
    this.unmuteVolume = undefined
  }

}
