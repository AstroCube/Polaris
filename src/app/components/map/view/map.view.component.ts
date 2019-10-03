import {Component} from '@angular/core';
import {faCode, faMapSigns} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Map} from '../../../models/minecraft/map';
import { GLOBAL } from '../../../services/global';
import {User} from '../../../models/user';
import {MapService} from '../../../services/map.service';

@Component({
  selector: 'map-view',
  templateUrl: './map.view.component.html'
})

export class MapViewComponent {

  public map : Map;
  public user : User;
  public placeholder : any;
  public canDownload : boolean;
  public url : string;
  faCode = faCode;
  faMapSigns = faMapSigns;

  constructor(
    private _route: ActivatedRoute,
    private _mapService: MapService
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this.map = data.MapViewGuard.map;
      this.canDownload = data.MapViewGuard.canDownload;
      this.placeholder = data.MapViewGuard.placeholder;
      this.user = data.MapViewGuard.map;
    });
    if (!this.canDownload) this.canDownload = this.user._id === this.map.author._id;
  }

  downloadFile() {
    this._mapService.mapDownloadFile(this.map.file).subscribe((file) => {
      let fileBlob = new Blob([file], {type: "application/zip"});

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(fileBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(fileBlob);

      let link : any = document.createElement('a');
      link.href = data;
      link.download = this.map.name.toLowerCase().replace(" ", "_");
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);

    });
  }

  downloadJSON() {
    this._mapService.mapDownloadJSON(this.map.configuration).subscribe((file) => {
      let fileBlob = new Blob([file], {type: "application/json"});

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(fileBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(fileBlob);

      let link : any = document.createElement('a');
      link.href = data;
      link.download = this.map.name.toLowerCase().replace(" ", "_");
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);

    });
  }

}
