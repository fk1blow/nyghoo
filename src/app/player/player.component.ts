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

  ngOnInit() {
    this.audioPlayer.nativeElement.play()
    console.log(this.station.stream)
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
    // we re interested only when `paused` has changes to that
    // we `stop` or `load` the audio
    // tslint:disable-next-line:curly
    if (!changes.paused) return;
    if (changes.paused.firstChange) return;

    if (changes.paused.currentValue && changes.paused.currentValue === true) {
      this.audioPlayer.nativeElement.pause()
    } else {
      this.audioPlayer.nativeElement.play()
    }
  }

}
