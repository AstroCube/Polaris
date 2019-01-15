import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[tab]'
})
export class TabDirective implements OnInit {

  @Input("tab_id") public tab_id: string;

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this._element.nativeElement.classList.contains("tab__link")) {
      this._renderer.listen(this._element.nativeElement, "click", () => {
        const tabs: HTMLCollectionOf<Element> = document.getElementsByClassName("tab");
        [].forEach.call(tabs, (tab) => {
          this._renderer.removeClass(tab, "tab--active");
        });
        const links: HTMLCollectionOf<Element> = document.getElementsByClassName("tab__link");
        [].forEach.call(links, (tab) => {
          this._renderer.removeClass(tab, "tab__link--active");
        });
        let selected = document.getElementById(this.tab_id);
        this._renderer.addClass(selected,"tab--active");
        this._renderer.addClass(this._element.nativeElement, "tab__link--active");
      });
    }
  }

}
