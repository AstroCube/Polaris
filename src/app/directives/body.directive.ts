import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[body]'
})
export class BodyDirective implements OnInit {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    this._renderer.listen(this._element.nativeElement, "click", (event: Event) => {
      const target: any = event.target;
      let affected = [];
      const dropdowns = this._element.nativeElement.getElementsByClassName("dropdown__content");
      [].forEach.call(dropdowns, (dropdown) => {
        affected.push(dropdown);
      });
      const profile_name = this._element.nativeElement.getElementsByClassName("header__profile-name");
      [].forEach.call(profile_name, (label) => {
        affected.push(label);
      });
      const header_menu = this._element.nativeElement.getElementsByClassName("header__menu");
      [].forEach.call(header_menu, (label) => {
        affected.push(label);
      });
      [].forEach.call(affected,(element) => {
        if (!element.contains(target)) {
          if (!target.classList.contains("dropdown__content") && !target.classList.contains("dropdown__label--active") && element.classList.contains("dropdown__content--active")) {
            [].forEach.call(element.parentNode.childNodes, (sibling) => {
              if (sibling.classList.contains("dropdown__label--active"))
                this._renderer.removeClass(sibling,"dropdown__label--active");
            });
            this._renderer.removeClass(element,"dropdown__content--active");
          }
          if (!target.classList.contains("header__menu-slug") && !target.classList.contains("header__profile-avatar") && !target.classList.contains("header__profile-name") && !target.classList.contains("header__menu")) {
            if (element.classList.contains("header__menu--expanded")) {
              [].forEach.call(element.parentNode.getElementsByTagName("*"), (sibling) => {
                if (sibling.classList.contains("header__profile-name--active"))
                  this._renderer.removeClass(sibling,"header__profile-name--active");
              });
              this._renderer.removeClass(element,"header__menu--expanded");
              this._renderer.removeStyle(element, "maxHeight");
            }
          }
        }
      });
    });
  }

}
