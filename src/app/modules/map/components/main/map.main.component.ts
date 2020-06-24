import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../../../services/global';
import {Meta, Title} from '@angular/platform-browser';
import {IMapMain} from "../../../../newModels/IMap";
import {MapService} from "../../../../services/minecraft/map.service";
import {IGamemode} from "../../../../newModels/IGamemode";

@Component({
  selector: 'map-main',
  templateUrl: './map.main.component.html'
})

export class MapMainComponent {

  public mapMain: IMapMain;
  public showSpinner: boolean;
  public url: string;

  constructor(
    private titleService: Title,
    private mapService: MapService,
    private metaService: Meta,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.url = GLOBAL.epsilon;
    this.showSpinner = false;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Mapas - " + GLOBAL.title);
    this.metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: 'Conóce la gran variedad de mapas y modos de juegos en Seocraft Network.'},
      {name: 'robots', content: 'index, follow'}
    ]);
    this.route.data.subscribe((data) => {
      this.mapMain = data.MapMainGuard;
    });
  }

  updateQuery(page: number): void {
    this.showSpinner = true;
    this.mapMain.maps.data = [];
    this.mapService.list(page, 15, this.mapMain.selected ? {gamemode: this.mapMain.selected._id} : {}).subscribe(
      response => {
        setTimeout(() => {
          this.mapMain.maps = response;
          this.showSpinner = false;
        }, 3000);
      },

      error  => {
        this.router.navigate(['/error'] , { queryParams: {type: "500", message: error.message}});
      }
    );
  }

  public selectGamemode(gamemode: IGamemode): void {
    this.mapMain.selected = gamemode;
    this.updateQuery(1);
  }

}
