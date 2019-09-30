import {Component} from '@angular/core';
import {faCode, faMapSigns} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Map} from '../../../models/minecraft/map';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';

@Component({
  selector: 'map-view',
  templateUrl: './map.view.component.html'
})

export class MapViewComponent {

  public map : Map;
  public user : User;
  public placeholder : any;
  public canDownload : boolean;
  faCode = faCode;
  faMapSigns = faMapSigns;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {}

  async ngOnInit() {
    this._route.data.subscribe((data) => {
      this.map = data.MapViewGuard.map;
      this.canDownload = data.MapViewGuard.canDownload;
      this.placeholder = data.MapViewGuard.placeholder;
      this.user = data.MapViewGuard.map;
    });
    if (!this.canDownload) this.canDownload = this.user._id === this.map.author._id;
  }
}
