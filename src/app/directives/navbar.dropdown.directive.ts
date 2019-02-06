import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[navbar-dropdown]'
})
export class NavbarDropdownDirective implements OnInit {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this._element.nativeElement.classList.contains("dropdown__label")) {
      this._renderer.listen(this._element.nativeElement, "click", () => {
        let dropdown = this._renderer.nextSibling(this._element.nativeElement);
        if (this._element.nativeElement.classList.contains("dropdown__label--active")) {
          this._renderer.removeClass(this._element.nativeElement,"dropdown__label--active");
        } else {
          this._renderer.addClass(this._element.nativeElement,"dropdown__label--active");
        }
        if (dropdown.classList.contains("dropdown__content")) {
          if (dropdown.classList.contains("dropdown__content--active")) {
            this._renderer.removeClass(dropdown,"dropdown__content--active");
          } else {
            this._renderer.addClass(dropdown, "dropdown__content--active");
          }
        }
      });
    }
  }

}
