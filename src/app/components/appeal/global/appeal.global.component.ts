import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {AppealService} from '../../../services/appeal.service';

@Component({
  selector: 'appeal-global',
  templateUrl: './appeal.global.component.html'
})

export class AppealGlobalComponent implements OnInit{

  public appeals: any = {};
  public permissions: any = {};
  public page: number = 1;
  public pages: number = 1;
  public type: string;

  constructor(
    private _appealService: AppealService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notifierService: NotifierService
  ) {}

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.appeals = data.AppealGlobalGuard.list.appeals;
      this.permissions = data.AppealGlobalGuard.permissions;
      this.page = data.AppealGlobalGuard.list.page;
      this.pages = data.AppealGlobalGuard.list.pages;
      this.type = data.AppealGlobalGuard.list.type;
    }));
  }

  assignAppeal(id: string) {
    this._appealService.appeal_assign(id).subscribe(
      response => {
        if (response.assigned) {
          this._notifierService.notify('success', "Has tomado la apelación correctamente.");
          this._router.navigate(['/apelar/' + id]);
        } else {
          this._notifierService.notify('error', "Ha ocurrido un error al tomar la apelación.");
        }
      },
      error => {
        let error_message = <any> error;
        if (error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }

}
