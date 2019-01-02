import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ChannelsService } from './channels.service';
import { Channel } from './channel.model';

@Component({
  selector: 'ny-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  selectedChannel?: Channel

  channels?: Channel[]

  @Output() changed = new EventEmitter<Channel>();

  constructor(private channelsService: ChannelsService) {}

  ngOnInit() {
    this.channelsService.getChannels()
      .subscribe((channels: Channel[]) => {
        this.channels = channels.sort(
          (a, b) => parseInt(a.listeners) < parseInt(b.listeners) ? 0 : -1)
        this.selectedChannel = channels[0]
        this.changed.emit(this.selectedChannel)
      })
  }

  onChangeChannel(channel: Channel) {
    if (this.selectedChannel && this.selectedChannel.id === channel.id) {
      return;
    }

    this.selectedChannel = channel
    this.changed.emit(this.selectedChannel)
  }

}
