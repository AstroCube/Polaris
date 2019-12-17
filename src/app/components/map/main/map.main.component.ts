import {Component} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Map} from '../../../models/minecraft/map';
import {GLOBAL} from '../../../services/global';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'map-main',
  templateUrl: './map.main.component.html'
})

export class MapMainComponent {

  public mapList : Map[];
  public page : number;
  public gamemode : any[];
  public selectedMode : any;
  public query : any = {};
  public pages : number;
  public url : string;
  faStar = faStar;

  constructor(
    private _titleService: Title,
    private _metaService: Meta,
    private _route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }

  async ngOnInit() {
    this._titleService.setTitle("Mapas - " + GLOBAL.title);
    this._metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: 'Conóce la gran variedad de mapas y modos de juegos en Seocraft Network.'},
      {name: 'robots', content: 'index, follow'}
    ]);
    if (this._route.snapshot.queryParams.gamemode) this.query = {gamemode: this._route.snapshot.queryParams.gamemode};
    this._route.data.subscribe((data) => {
      this.gamemode = data.MapMainGuard.gamemode;
      this.gamemode.shift();
      this.mapList = data.MapMainGuard.map.maps;
      this.page = data.MapMainGuard.map.page;
      this.pages = data.MapMainGuard.map.pages;
    });
    this.selectedMode = await this.gamemode.filter(a => a._id === this._route.snapshot.queryParams.gamemode)[0];
  }

}
