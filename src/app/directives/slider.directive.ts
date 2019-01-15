import {Directive, ElementRef, OnInit} from '@angular/core';
import Glide from '@glidejs/glide';

@Directive({
  selector: '[slider]'
})
export class SliderDirective implements OnInit {

  constructor(
    private _element: ElementRef
  ) {}

  ngOnInit() {
    if (this._element.nativeElement.classList.contains("slider")) {
      const customers = new Glide(this._element.nativeElement, {
        type: "carousel",
        perView: 1,
        direction: "rtl",
        autoplay: "10000"
      });
      customers.mount();
    }
  }

}
