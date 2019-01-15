import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {faFacebookF, faGitlab, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faBars, faComments, faCompass, faGamepad, faLock, faSearch, faShoppingBag, faSignInAlt, faTimes, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'application-header',
  templateUrl: './application.header.component.html'
})

export class ApplicationHeaderComponent implements OnInit {

  @ViewChild("login_close") public login_element: ElementRef;
  public requested_email: string;
  public requested_password: string;
  public requested_persistence: boolean;
  public logged: boolean;
  public username: string;
  public skin: string;
  public staff = true;
  faBars = faBars;
  faCompass = faCompass;
  faComments = faComments;
  faFacebookF = faFacebookF;
  faGamepad = faGamepad;
  faGitlab = faGitlab;
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
    this._router.events.subscribe(() => {
      this.changeEvent();
    });
  }


  ngOnInit(): void {
    if (this._userService.getToken() && this._userService.getToken() != "none") {
      this.logged = true;
      this._userService.get_user(null).then(response => {
        this.username = response.user.username;
        this.skin = response.user.skin;
      });
    }
  }

  changeEvent(): void {
    if (this._userService.getToken()  && this._userService.getToken() != "none") {
      this.logged = true;
      this._userService.get_user(null).then(response => {
        this.username = response.user.username;
        this.skin = response.user.skin;
      });
    }
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
    this.username = null;
    this.skin = null;
    localStorage.clear();
    this._router.navigate(['/']);
  }

}
