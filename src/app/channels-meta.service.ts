import { Injectable } from '@angular/core';
import {Subject } from 'rxjs';
import { ChannelUpdate } from './channels/channel-update.model'

@Injectable({
  providedIn: 'root'
})
export class ChannelsMetaService {

  public updates$ = new Subject<ChannelUpdate>()

  constructor() {
    // TODO replace hardcoded endpoint
    const ws = new WebSocket('ws://localhost:3000')

    ws.addEventListener('open', (conn) => {})

    ws.addEventListener('message', (msg) => {
      const data = JSON.parse(msg.data)
      this.updates$.next(data)
    })

    ws.addEventListener('error', (err) => this.updates$.error(err))

    ws.addEventListener('close', () => {
      console.log('ws closing?')
      this.updates$.complete()
    })
  }
}
