import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Map} from '../../../../models/minecraft/map';
import { GLOBAL } from '../../../../services/global';
import {User} from '../../../../models/user';
import {MapService} from '../../../../services/minecraft/map.service';
import {Title} from '@angular/platform-browser';
import {IMapView} from "../../../../newModels/IMap";
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";

@Component({
  selector: 'map-view',
  templateUrl: './map.view.component.html'
})

export class MapViewComponent implements OnInit {

  public data: IMapView;
  public related: boolean;
  public url: string;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private mapService: MapService
  ) {
    this.url = GLOBAL.epsilon;
    this.related = false;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.data = data.MapViewGuard;
      console.log(this.data);
      this.related = this.isRelated();
    });
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  private isRelated(): boolean {
    return this.data.permissions && (
      this.data.permissions.permissions.maps.manage ||
      this.data.permissions.user._id.toString() === (this.data.map.author as IUser)._id.toString() ||
      this.data.map.contributors.some(c => (c.contributor as IUser)._id.toString() === this.data.permissions.user._id.toString())
    );
  }

  downloadFile() {
    //TODO: Fix  downloadable
    /*
      this.mapService.mapDownloadFile(this.map.file).subscribe((file) => {
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
     */
  }

  downloadJSON() {
    /*
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
     */
  }

}
