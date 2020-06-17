import { Injectable } from '@angular/core';
import {GithubService} from '../../../services/github.service';
import {Router} from '@angular/router';
import {CREDENTIALS} from '../../../services/github';

@Injectable()
export class ApplicationDevelopementGuard {

  constructor (
    private _githubService: GithubService,
    private _router: Router
  )
  {}

  resolve(): Promise<any> {
    return this.getRepositories().then(response => {
      if (response) {
        return response;
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    }).catch(() => {
      return false;
    });
  }

  async getRepositories() {
    let data : any = {};
    data.api = await this._githubService.getCommits(CREDENTIALS.api).then(response => {
      if (response) {
        return response.slice(0, 30);
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });
    data.website = await this._githubService.getCommits(CREDENTIALS.website).then(response => {
      if (response) {
        return response.slice(0, 30);
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });
    data.minecraft = await this._githubService.getCommits(CREDENTIALS.minecraft).then(response => {
      if (response) {
        return response.slice(0, 30);
      } else {
        this._router.navigate(['/error'] , { queryParams: {type: "500"}});
        return false;
      }
    }).catch(() => {
      this._router.navigate(['/error'] , { queryParams: {type: "500"}});
      return false;
    });
    return data;
  }
}
