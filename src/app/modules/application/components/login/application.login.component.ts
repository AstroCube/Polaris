import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {NotifierService} from 'angular-notifier';
import {Meta, Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../services/global';

@Component({
  selector: 'application-login',
  templateUrl: './application.login.component.html'
})

export class ApplicationLoginComponent implements OnInit {

  public requested_email: string;
  public requested_password: string;
  public requested_persistence: boolean;

  constructor(
    private _metaService: Meta,
    private _titleService: Title,
    private _activatedRoute: ActivatedRoute,
    private _notifierService: NotifierService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.requested_persistence = false;
    this._titleService.setTitle("Iniciar sesión - " + GLOBAL.title);
    this._metaService.addTags([
      {name: 'keywords', content: GLOBAL.tags},
      {name: 'description', content: 'Inicia sesión en nuestro sitio web o registrate desde tu cuenta en Minecraft.'},
      {name: 'robots', content: 'index, follow'}
    ]);
  }

  ngOnInit(): void {
    if (this._userService.getEpsilonToken() !== '') this._router.navigate(['/']);
    if (this._activatedRoute.snapshot.queryParams.verified) this._notifierService.notify('success', "Haz verificado correctamente tu cuenta, solo te queda iniciar sesión.");
  }

  loginRequest(): void {
    let request: any = {};
    request.email = this.requested_email;
    request.password = this.requested_password;
    //request.persistence = this.requested_persistence;
    this._router.navigate(['']);
    this._userService.login(request).subscribe(
      response => {
        if (response.token.length == 0) {
          this._notifierService.notify('error', "Ha ocurrido un error al iniciar sesión.");
          localStorage.clear();
        } else {
          localStorage.setItem("epsilonToken", response.token);
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
