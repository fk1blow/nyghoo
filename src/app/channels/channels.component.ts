import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Channel } from './channel.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ny-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  @Input() channels: Channel[]

  @Input() selected: BehaviorSubject<Channel>

  @Output() changed = new EventEmitter<Channel>();

  ngOnInit() {}

  onChangeChannel(channel: Channel) {
    if (this.selected.value.id === channel.id) {
      return;
    }
    this.changed.emit(channel)
  }

}
