import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'ny-window-controls',
  templateUrl: './window-controls.component.html',
  styleUrls: ['./window-controls.component.scss']
})
export class WindowControlsComponent implements OnInit {

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
  }

  onButtonClose() {
    if (this.electronService.ipcRenderer) {
      this.electronService.ipcRenderer.sendSync('quit-app')
    }
  }

}
