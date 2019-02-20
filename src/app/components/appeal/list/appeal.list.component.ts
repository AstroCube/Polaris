import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faList, faTimes} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../services/user.service';
import {AppealService} from '../../../services/appeal.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'appeal-list',
  templateUrl: './appeal.list.component.html'
})

export class AppealListComponent {

  public appeal_id: string;
  public appeal_explanation: string;
  public not_appealed: any[] = [];
  public appeals: any[] = [];
  public user_ip: Promise<any | never>;
  faTimes = faTimes;
  faList = faList;

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notifierService: NotifierService,
    private _userService: UserService,
    private _appealService: AppealService
  ) {}

  async ngOnInit() {
    this._route.data.subscribe((data => {
      console.log(data.AppealListGuard);
      this.not_appealed = data.AppealListGuard.not_appealed;
    }));
    this.user_ip = await this._userService.user_ip().then((ip) => {
      return ip.ip;
    }).catch((err) => {
      switch (err.status) {
        case 404: {
          this._router.navigate(['/error'] , { queryParams: {type: "404"}});
          return false;
        }
        case 403: {
          this._router.navigate(['/error'] , { queryParams: {type: "403"}});
          return false;
        }
        default: {
          this._router.navigate(['/error'] , { queryParams: {type: "500"}});
          return false;
        }
      }
    });
  }

  appealInsert(id) {
    this.appeal_id = id;
  }

  appealReset() {
    this.appeal_id = null;
    this.appeal_explanation = null;
  }

  appealRequest() {
    let request = {
      punishment: this.appeal_id,
      creator_ip: this.user_ip,
      explanation: this.appeal_explanation
    };

    this._appealService.appeal_create(request).subscribe(
      response => {
        if (response) {
          this._notifierService.notify('success', "La apelación se ha creado correctamente.");
          this._router.navigate(['/apelar/' + response.appeal._id]);
        } else {
          this._notifierService.notify('error', "Ha ocurrido un error al crear la apelación.");
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
