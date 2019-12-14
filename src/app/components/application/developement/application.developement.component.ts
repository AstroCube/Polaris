import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'application-developement',
  templateUrl: './application.developement.component.html'
})

export class ApplicationDevelopementComponent {

  public apiCommits : any;
  public websiteCommits : any;
  public minecraftCommits : any;

  constructor(
    private _metaService: Meta,
    private _titleService: Title,
    private _route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this._route.data.subscribe((data) => {
      this.apiCommits = data.ApplicationDevelopementGuard.api;
      this.websiteCommits = data.ApplicationDevelopementGuard.website;
      this.minecraftCommits = data.ApplicationDevelopementGuard.minecraft;
    });

    this._titleService.setTitle("Desarrollo - " + GLOBAL.title);
    this._metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: 'Registro público de desarrollo y actualizaciones por parte de nuestro equipo. ¡Algunas de ellas contienen mensajes divertidos!'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

}
