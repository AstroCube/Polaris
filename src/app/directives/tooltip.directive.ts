import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnInit {

  @Input("placement") public placement: any;
  @Input("content") public content: any;
  @Input("arrow") public arrow: boolean;

  constructor(
    private _element: ElementRef
  ) {
    this.placement = "top";
    this.arrow = true;
  }

  ngOnInit() {
    tippy(this._element.nativeElement, {
      arrow: this.arrow,
      content: this.content,
      placement: this.placement
    });
  }

}
