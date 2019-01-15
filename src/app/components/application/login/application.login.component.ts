import {Component, OnInit} from '@angular/core';
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'application-login',
  templateUrl: './application.login.component.html'
})

export class ApplicationLoginComponent implements OnInit {

  public requested_email: string;
  public requested_password: string;
  public requested_persistence: boolean;
  faUser = faUser;
  faLock = faLock;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.requested_persistence = false;
  }

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.queryParams.verified) this._notifierService.notify('success', "Haz verificado correctamente tu cuenta, solo te queda iniciar sesión.");
  }

  loginRequest(): void {
    let request: any = {};
    request.email = this.requested_email;
    request.password = this.requested_password;
    request.persistence = this.requested_persistence;

    this._userService.login(request).subscribe(
      response => {
        if (response.token.length == 0) {
          this._notifierService.notify('error', "Ha ocurrido un error al iniciar sesión.");
        } else {
          localStorage.setItem("token", response.token);
          this._router.navigate(['']);
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }
}
