import {Directive, ElementRef, OnInit} from '@angular/core';
import OverlayScrollbars from '../../../node_modules/overlayscrollbars/js/OverlayScrollbars';

@Directive({
  selector: '[scrollbar]'
})
export class ScrollbarDirective implements OnInit {

  constructor(
    private _element: ElementRef
  ) {}

  ngOnInit() {
    OverlayScrollbars(this._element.nativeElement, {
      scrollbars: {
        autoHide: "leave"
      }
    });
  }

}
