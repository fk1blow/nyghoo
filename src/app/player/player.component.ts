import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { PlayerService } from '../player.service';
import { Station } from '../radio-stations/station.model';

@Component({
  selector: 'ny-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() station: Station

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

  ngOnInit() {
    // it s behaving strange because the `autoplay` should ... autoplay
    // this.audioPlayer.nativeElement.play()
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
