import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[profile-dropdown]'
})
export class ProfileDropdownDirective implements OnInit {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this._element.nativeElement.classList.contains("header__menu-slug")) {
      this._renderer.listen(this._element.nativeElement, "click", () => {
        const names = this._element.nativeElement.getElementsByClassName("header__profile-name");
        let panel = this._renderer.nextSibling(this._element.nativeElement);
        [].forEach.call(names, (name) => {
          if (name.classList.contains("header__profile-name--active")) {
            this._renderer.removeClass(name,"header__profile-name--active");
          } else {
            this._renderer.addClass(name, "header__profile-name--active");
          }
        });
        if (panel.classList.contains("header__menu")) {
          if (panel.classList.contains("header__menu--expanded")) {
            this._renderer.removeClass(panel,"header__menu--expanded");
            this._renderer.removeStyle(panel, "maxHeight");
          } else {
            this._renderer.addClass(panel,"header__menu--expanded");
          }
        }
      });
    }
  }

}
