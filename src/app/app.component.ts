import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {NgxSpinnerService} from "ngx-spinner";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  public token: string;

  constructor (
    private userService: UserService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.spinnerService.show('primary');
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationEnd:
        case event instanceof NavigationError: {
          this.spinnerService.hide('primary');
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
