import {Component} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {Map} from '../../../models/minecraft/map';
import {GLOBAL} from '../../../services/global';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'map-main',
  templateUrl: './map.main.component.html'
})

export class MapMainComponent {

  public mapList : Map[];
  public page : number;
  public options : any[];
  public route : string;
  public pages : number;
  public url : string;
  faStar = faStar;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.route = "";
    let constructor : HttpParams = new HttpParams();
    if (this._route.snapshot.queryParams.gamemode) constructor.set("gamemode", this._route.snapshot.queryParams.gamemode);
    this.route = constructor.toString() + "&page=";
    this._route.data.subscribe((data) => {
      this.options = data.MapMainGuard.gamemode;
      this.options.shift();
      this.mapList = data.MapMainGuard.map.maps;
      this.page = data.MapMainGuard.map.page;
      this.pages = data.MapMainGuard.map.pages;
    });
  }

}
