import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';

@Directive({
  selector: '[popup]'
})
export class PopupDirective implements OnInit {

  @Input("popup_id") public popup_id: string;

  constructor(
    private _element: ElementRef,
    private _router: Router,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    this._renderer.listen(this._element.nativeElement, "click", () => {
      const popup: any = document.getElementById(this.popup_id);
      if (this.popup_id === "login-popup") {
        if (this._router.url !== '/login' && this._router.url !== '/registrarse') {
          if (!popup.classList.contains("login-popup--active")) {
            this._renderer.addClass(popup, "login-popup--active");
          } else {
            this._renderer.removeClass(popup, "login-popup--active");
          }
        }
      } else if (this.popup_id == "account-popup") {
        if (popup.classList.contains("account-popup--active")) {
          this._renderer.removeClass(popup, "account-popup--active");
        } else {
          this._renderer.addClass(popup, "account-popup--active");
        }
      } else if (this.popup_id == "appeal-popup") {
        if (popup.classList.contains("appeal-popup--active")) {
          this._renderer.removeClass(popup, "appeal-popup--active");
        } else {
          this._renderer.addClass(popup, "appeal-popup--active");
        }
      } else if (this.popup_id == "report-popup") {
        if (popup.classList.contains("report-popup--active")) {
          this._renderer.removeClass(popup, "report-popup--active");
        } else {
          this._renderer.addClass(popup, "report-popup--active");
        }
      }
    });
  }

}
