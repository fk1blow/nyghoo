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

  @Input() channel: BehaviorSubject<Channel | null>

  @Input() volume: Observable<'Increase' | 'Decrease'>

  @Input() paused: BehaviorSubject<boolean>

  @Input() toggleMute: Observable<boolean>

  @Input() startVolume = 2

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  ngOnInit() {
    this.audio.volume = (this.startVolume > 0 ? this.startVolume / 10 : 0)

    this.sliderValue = this.startVolume

    // channel and paused changes
    const playerChanges = combineLatest(this.paused, this.channel)

    // player gets paused
    // playerChanges.pipe(
    //   map(val => val[0]),
    //   distinctUntilChanged(),
    //   filter(paused => paused === true)
    // )
    //   .subscribe(() => {
    //     console.log('g')
    //     this.audio.pause()
    //     this.audio.src = ''
    //   })

    // channel was changed and should play
    // playerChanges.pipe(
    //   filter((val) => val[0] === false),
    // )
    //   .subscribe((val) => {
    //     this.audio.src = `http://localhost:3000/audio/somafm/${val[1].id}`
    //     this.audio.play()
    //   })

    // channel was changed and should play
    // playerChanges.pipe(
    //   filter((val) => val[0] === false),
    //   map((val) => val[1]),
    //   distinctUntilChanged()
    // )
    //   .subscribe((val) => {
    //     console.log('xxx')
    //     // this.audio.src = `http://localhost:3000/audio/somafm/${val.id}`
    //     // this.audio.play()
    //   })

    // it depends too much on the sequence of the observables...

    this.channel.subscribe(r => {
      console.log(r)
    })

    console.log(this.channel.value)

    this.paused.pipe(
      filter((val) => val === true),
      // distinctUntilChanged()
    )
      .subscribe((val) => {
        console.log('yyy')
        this.audio.src = ''
        this.audio.pause()
        // this.audio.src = `http://localhost:3000/audio/somafm/${val.id}`
        // this.audio.play()
      })

      this.paused.pipe(
        filter((val) => val === false),
        map(() => {
          // console.log(this.channel)
          return this.channel.value
        })
      )
        .subscribe((chan) => {
          console.log(chan)

          // this.audio.src = `http://localhost:3000/audio/somafm/${chan.id}`
          // this.audio.play()
        })


    // volume changes

    this.volume.pipe(
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

    this.volume.pipe(
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
