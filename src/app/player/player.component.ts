import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { Station } from '../channels/station.model';
import { Observable } from 'rxjs';
import { switchMap, takeWhile, filter } from 'rxjs/operators';
import { Playlist } from '../channels/playlist.model';
import { Channel } from '../channels/channel.model';

@Component({
  selector: 'ny-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  currentPlaying?: string

  @Input() channel: Observable<Channel | null>

  @Input() volume: number

  @Input() paused: boolean

  @Output() volumeChanged = new EventEmitter<number>();

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  get volumeScaled() {
    // cannot assume that volume will always hold at least zero
    return (this.volume <= 0) ? 0 : this.volume / 10
  }

  get initialVolume() {
    return this.volume
  }

  // constructor(private stationPlaylistService: StationPlaylistService) {}

  ngOnInit() {
    this.channel.subscribe(r => {
      console.log(r)
      // console.log('this is the moment to change the source of the audioPlayer')
    })

    // this.station
    //   .pipe(
    //     filter(() => !this.paused),
    //     switchMap(({ playlist }) => this.stationPlaylistService.follow(playlist)),
    //   )
    //   .subscribe((playlist: Playlist) => {
    //     const firstSong = playlist[0]
    //     this.currentPlaying = `${firstSong.artist.text} - ${firstSong.title.text}`
    //   })
  }

  mouseWheelUpFunc(evt: any) {
    console.log(evt)
  }

  mouseWheelDownFunc(evt: any) {
    console.log(evt)
  }

  onVolumeChange(volume: number) {
    this.volumeChanged.emit(volume)
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    const {paused, station} = changes

    if (station && !station.firstChange) {
      // if it's muted and you know it...
      this.audioPlayer.nativeElement.play()
    }

    if (paused && !paused.firstChange) {
      if (paused.currentValue && paused.currentValue === true) {
        this.audioPlayer.nativeElement.pause()
      } else {
        this.audioPlayer.nativeElement.load()
      }
    }
  }

}
