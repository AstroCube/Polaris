import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'application-developement',
  templateUrl: './application.developement.component.html'
})

export class ApplicationDevelopementComponent {

  public apiCommits : any;
  public websiteCommits : any;
  public minecraftCommits : any;

  constructor(
    private _route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this._route.data.subscribe((data) => {
      this.apiCommits = data.ApplicationDevelopementGuard.api;
      this.websiteCommits = data.ApplicationDevelopementGuard.website;
      this.minecraftCommits = data.ApplicationDevelopementGuard.minecraft;
    });
  }

}
