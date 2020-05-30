import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {faFacebookF, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faBars, faComments, faCompass, faGamepad, faLock, faSearch, faShoppingBag, faSignInAlt, faTimes, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {faGithub} from '@fortawesome/free-brands-svg-icons/faGithub';
import Typed from 'typed.js';
import {forkJoin, from} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {IHeaderUser} from '../../../newModels/user/IUserProfile';
import {IUser} from "../../../newModels/user/IUser";

@Component({
  selector: 'application-header',
  templateUrl: './application.header.component.html'
})

export class ApplicationHeaderComponent implements OnInit {

  @ViewChild("login_close") public login_element: ElementRef;
  public header: IHeaderUser;
  public requested_email: string;
  public requested_password: string;
  public requested_persistence: boolean;
  public logged: boolean;
  faBars = faBars;
  faCompass = faCompass;
  faComments = faComments;
  faFacebookF = faFacebookF;
  faGamepad = faGamepad;
  faGithub = faGithub;
  faLock = faLock;
  faSearch = faSearch;
  faShoppingBag = faShoppingBag;
  faSignInAlt = faSignInAlt;
  faTimes = faTimes;
  faTwitter = faTwitter;
  faUser = faUser;
  faUsers = faUsers;
  faYoutube = faYoutube;

  constructor(
    private _notifierService: NotifierService,
    private _router: Router,
    private _userService: UserService,
    private _renderer: Renderer2
  ) {
    this.header = {} as IHeaderUser;
    this.header.user = {} as IUser;
    this.header.user.username = '';
    this._router.events.subscribe(() => {
      this.changeEvent();
    });
  }


  ngOnInit(): void {
    if (
      this._userService.getToken() && this._userService.getToken() != "none" &&
      this._userService.getEpsilonToken() && this._userService.getEpsilonToken() != "none"
    ) {
      this.logged = true;
      this._userService.getUserObservable().pipe(
        mergeMap((user) =>
          forkJoin(
            from(this._userService.permission_checker_promise("web_permissions.group.manage")),
            from(this._userService.permission_checker_promise("web_permissions.category.manage")),
            from(this._userService.permission_checker_promise("web_permissions.user.manage")),
            from(this._userService.permission_checker_promise("web_permissions.forum.manage"))
          ).pipe(
            map((response) => ({
              user: user,
              group: response[0].has_permission,
              category: response[1].has_permission,
              userEdit: response[2].has_permission,
              forum: response[3].has_permission,
              generalAccess: response[0] || response[1] || response[2] || response[3]
            } as IHeaderUser))
          )
        )
      ).subscribe(
        (header) => {
          this.header = header;
        },

        (error) => {
          this.logout();
          this._notifierService.notify('error', 'Ha ocurrido un error con tu sesión y se ha cerrado por seguridad.');
        }
      );
    }

    const options = {
      strings: [
        '¡Juega en mc.seocraft.net!',
        'Lleva casco, ¡Estamos en beta!',
        '¡Recuerda ser amable con los demás!',
        '¡Puedes entrar siendo no premium!'
      ],
      typeSpeed: 60,
      backSpeed: 60,
      backDelay: 1000,
      shuffle: true,
      loop: true
    };

    const typed = new Typed('.header__announcements-slider', options);
  }

  changeEvent(): void {
    if (this._userService.getToken()  && this._userService.getToken() != "none") {
      this.logged = true;
      this._userService.getUserObservable().subscribe(
        (user) => {
          this.header.user = user;
        },

        (error) => {
          this.logout();
          this._notifierService.notify('error', 'Ha ocurrido un error con tu sesión y se ha cerrado por seguridad.');
        }
      )
    }
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
        } else {
          localStorage.setItem("token", response.token);
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );

    this._userService.loginEpsilon(request).subscribe(
      response => {
        if (response.token.length == 0) {
          this._notifierService.notify('error', "Ha ocurrido un error al iniciar sesión.");
          localStorage.clear();
        } else {
          localStorage.setItem("epsilonToken", response.token);
          if (this._router.url == "/registrarse" || this._router.url == "/login") this._router.navigate(['']);
          this.changeEvent();
          this._renderer.selectRootElement(this.login_element.nativeElement).click();
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

  logout(): void {
    this.logged = false;
    this.header = undefined;
    localStorage.clear();
    this._router.navigate(['/']);
  }

  comingSoon(): void {
    this._router.navigate(['/error'], {queryParams: {type: 308}});
  }

}
