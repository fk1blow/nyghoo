import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ChannelsService } from './channels.service';
import { Channel } from './channel.model';

@Component({
  selector: 'ny-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channels?: Channel[]

  @Input() selected: Channel

  @Output() changed = new EventEmitter<Channel>();

  @Output() loaded = new EventEmitter<Channel[]>();

  constructor(private channelsService: ChannelsService) {}

  ngOnInit() {
    this.channelsService.getChannels()
      .subscribe((channels: Channel[]) => {
        this.channels = channels.sort(
          (a, b) => parseInt(a.listeners, 10) < parseInt(b.listeners, 10) ? 0 : -1)
        this.loaded.emit(channels)
      })
  }

  onChangeChannel(channel: Channel) {
    if (this.selected && this.selected.id === channel.id) {
      return;
    }
    this.changed.emit(channel)
  }

}
