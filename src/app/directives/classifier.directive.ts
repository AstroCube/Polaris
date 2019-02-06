import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[classifier]'
})
export class ClassifierDirective implements OnInit {

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this._element.nativeElement.classList.contains("classifier__label")) {
      this._renderer.listen(this._element.nativeElement, "click", () => {
        let classifier = this._renderer.nextSibling(this._element.nativeElement);
        if (this._element.nativeElement.classList.contains("classifier__label--active")) {
          this._renderer.removeClass(this._element.nativeElement,"classifier__label--active");
        } else {
          this._renderer.addClass(this._element.nativeElement,"classifier__label--active");
        }
        if (classifier.classList.contains("classifier__content")) {
          if (classifier.classList.contains("classifier__content--active")) {
            this._renderer.removeClass(classifier,"classifier__content--active");
          } else {
            this._renderer.addClass(classifier, "classifier__content--active");
          }
        }
      });
    }
  }

}
