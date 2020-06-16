import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  public token: string;

  constructor (
    private _userService: UserService,
    private _spinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this._spinnerService.show();
    if (this._userService.getToken() && this._userService.getToken() !== "none") {
      this._userService.token_validation().subscribe(
        response => {
          if (response.expired) {
            localStorage.clear();
            this.token = null;
          } else {
            this.token = this._userService.getToken();
          }
        },

        () => {
          localStorage.clear();
        }
      );
    }
  }
}
