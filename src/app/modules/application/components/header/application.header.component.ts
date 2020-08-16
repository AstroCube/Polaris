import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {NavigationEnd, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import Typed from 'typed.js';
import {forkJoin, from} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {IHeaderUser} from '../../../../newModels/user/IUserProfile';
import {IUser} from "../../../../newModels/user/IUser";
import {GroupService} from "../../../../services/group.service";

@Component({
  selector: 'application-header',
  templateUrl: './application.header.component.html'
})

export class ApplicationHeaderComponent implements OnInit {

  @ViewChild("login_close") public login_element: ElementRef;
  public header: IHeaderUser = {
    user: {username: ''} as IUser
  } as IHeaderUser;
  public requested_email: string;
  public requested_password: string;
  public requested_persistence: boolean;
  public logged: boolean;

  constructor(
    private notifierService: NotifierService,
    private groupService: GroupService,
    private router: Router,
    private userService: UserService,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.retrieveData();
    });
  }


  ngOnInit(): void {
    this.retrieveData();

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
          localStorage.clear();
        } else {
          localStorage.setItem("epsilonToken", response.token);
          if (this.router.url == "/registrarse" || this.router.url == "/login") this.router.navigate(['']);
          this.retrieveData();
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

  private checkLogin(): void {
    this.logged = this.userService.getEpsilonToken() !== '';
  }

  public retrieveData(): void {
    this.checkLogin();
    if (this.logged) {
      this.userService.getUser().pipe(
        mergeMap((user) =>
          forkJoin(
            [from(this.groupService.permissionsManifest())]
          ).pipe(
            map((response) => ({
              user: user,
              group: (response[0].group && response[0].group.manage),
              category: (response[0].category && response[0].category.manage),
              userEdit: (response[0].user && response[0].user.manage),
              forum: (response[0].forum && response[0].forum.manage),
              generalAccess: (response[0].group && response[0].group.manage) ||
                (response[0].category && response[0].category.manage) ||
                (response[0].user && response[0].user.manage) ||
                (response[0].forum && response[0].forum.manage)
            } as IHeaderUser))
          )
        )
      ).subscribe(
        (header) => {
          this.header = header;
          this.logged = true;
        },

        (error) => {
          this.logout();
          this.notifierService.notify('error', 'Ha ocurrido un error con tu sesión y se ha cerrado por seguridad.');
        }
      );
    }
  }

}
