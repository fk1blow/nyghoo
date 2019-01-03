import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges, ElementRef, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Channel } from '../channels/channel.model';

@Component({
  selector: 'ny-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() channel: Observable<Channel | null>

  @Input() volume: number

  @Input() paused: boolean
  // @Input() paused: Observable<boolean>

  @Output() volumeChanged = new EventEmitter<number>();

  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  get volumeScaled() {
    // cannot assume that volume will always hold at least zero
    return (this.volume <= 0) ? 0 : this.volume / 10
  }

  get initialVolume() {
    return this.volume
  }

  ngOnInit() {
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

  // do not want

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('here be problems')

  //   const {paused, station} = changes

  //   if (station && !station.firstChange) {
  //     // if it's muted and you know it...
  //     this.audioPlayer.nativeElement.play()
  //   }

  //   // if (paused && !paused.firstChange && this.audioPlayer) {
  //   if (paused && !paused.firstChange) {
  //     if (paused.currentValue && paused.currentValue === true) {
  //       this.audioPlayer.nativeElement.pause()

  //       this.audioPlayer.nativeElement.src = ''

  //       // this.audioPlayer.nativeElement.unload()
  //     } else {
  //       this.audioPlayer.nativeElement.load()
  //       this.audioPlayer.nativeElement.src = 'http://localhost:3000/audio/somafm/groovesalad'
  //     }
  //   }
  // }

}
