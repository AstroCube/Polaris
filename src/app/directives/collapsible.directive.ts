import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[collapsible]'
})
export class CollapsibleDirective implements OnInit {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this._element.nativeElement.classList.contains("collapsible__button")) {
      this._renderer.listen(this._element.nativeElement, "click", () => {
        let panel = this._renderer.nextSibling(this._element.nativeElement);
        if (panel.classList.contains("collapsible__panel")) {
          if (this._element.nativeElement.classList.contains("collapsible__button--active")) {
            this._renderer.removeClass(this._element.nativeElement,"collapsible__button--active");
          } else {
            this._renderer.addClass(this._element.nativeElement,"collapsible__button--active");
          }
          if (panel.style.maxHeight) {
            this._renderer.removeStyle(panel, "maxHeight");
          } else {
            this._renderer.setStyle(panel, "maxHeight", panel.scrollHeight + "px");
          }
        }
      });
    }
  }

}
