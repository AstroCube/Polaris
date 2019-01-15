import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[navbar-responsive]'
})
export class NavbarResponsiveDirective implements OnInit {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this._element.nativeElement.classList.contains("header__navigator-responsive")) {
      this._renderer.listen(this._element.nativeElement, "click", () => {
        let navigator = this._renderer.nextSibling(this._element.nativeElement);
        navigator.classList.add("header__navigator--active");
      });
    }

    if (this._element.nativeElement.classList.contains("header__navigator-close")) {
      this._renderer.listen(this._element.nativeElement, "click", () => {
        let navigator = this._renderer.parentNode(this._element.nativeElement);
        navigator.classList.remove("header__navigator--active");
      });
    }
  }

}
