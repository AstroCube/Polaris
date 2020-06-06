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
import {GroupService} from "../../../services/group.service";

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
    private notifierService: NotifierService,
    private groupService: GroupService,
    private router: Router,
    private userService: UserService,
    private renderer: Renderer2
  ) {
    this.header = {} as IHeaderUser;
    this.header.user = {} as IUser;
    this.header.user.username = '';
    this.router.events.subscribe(() => {
      this.changeEvent();
    });
  }


  ngOnInit(): void {
    if (
      this.userService.getToken() !== '' && this.userService.getEpsilonToken() !== ''
    ) {
      this.logged = true;
      this.userService.getUserObservable().pipe(
        mergeMap((user) =>
          forkJoin(
            from(this.groupService.permissionsManifest())
          ).pipe(
            map((response) => ({
              user: user,
              group: response[0].group.manage,
              category: response[0].category.manage,
              userEdit: response[0].user.manage,
              forum: response[0].forum.manage,
              generalAccess: response[0].group.manage || response[0].category.manage || response[0].user.manage || response[0].forum.manage
            } as IHeaderUser))
          )
        )
      ).subscribe(
        (header) => {
          this.header = header;
        },

        (error) => {
          this.logout();
          this.notifierService.notify('error', 'Ha ocurrido un error con tu sesión y se ha cerrado por seguridad.');
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
    if (this.userService.getToken()  && this.userService.getToken() != "none") {
      this.logged = true;
      this.userService.getUserObservable().subscribe(
        (user) => {
          this.header.user = user;
        },

        (error) => {
          this.logout();
          this.notifierService.notify('error', 'Ha ocurrido un error con tu sesión y se ha cerrado por seguridad.');
        }
      )
    }
  }

  loginRequest(): void {
    let request: any = {};
    request.email = this.requested_email;
    request.password = this.requested_password;
    //request.persistence = this.requested_persistence;
    this.router.navigate(['']);

    this.userService.login(request).subscribe(
      response => {
        if (response.token.length == 0) {
          this.notifierService.notify('error', "Ha ocurrido un error al iniciar sesión.");
        } else {
          localStorage.setItem("token", response.token);
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', error.error.message);
        }
      }
    );

    this.userService.loginEpsilon(request).subscribe(
      response => {
        if (response.token.length == 0) {
          this.notifierService.notify('error', "Ha ocurrido un error al iniciar sesión.");
          localStorage.clear();
        } else {
          localStorage.setItem("epsilonToken", response.token);
          if (this.router.url == "/registrarse" || this.router.url == "/login") this.router.navigate(['']);
          this.changeEvent();
          this.renderer.selectRootElement(this.login_element.nativeElement).click();
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', error.error.message);
        }
      }
    );
  }

  logout(): void {
    this.logged = false;
    this.header = undefined;
    localStorage.clear();
    this.router.navigate(['/']);
  }

  comingSoon(): void {
    this.router.navigate(['/error'], {queryParams: {type: 308}});
  }

}
