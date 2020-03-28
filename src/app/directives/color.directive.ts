import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Directive({
  selector: '[color]'
})
export class ColorDirective implements OnInit {

  @Input("id") public id: string;

  constructor(
    private _element: ElementRef,
    private _router: Router,
    private _userService: UserService,
    private _renderer: Renderer2
  ) {}

  async ngOnInit() {
    if (this.id) {
      await this._userService.getPrefix(this.id).then((prefix) => {
        this._renderer.setProperty(this._element.nativeElement, 'innerHTML', prefix.username);
        this._renderer.setStyle(this._element.nativeElement, 'color', prefix.userColor);
        this._renderer.setStyle(this._element.nativeElement, 'cursor', 'pointer');
        this._renderer.setStyle(this._element.nativeElement, 'partial-select', 'none');
        this._renderer.listen(this._element.nativeElement, "click", () => {
          this._router.navigate(['/' + prefix.username]);
        });
      }).catch(() => {
        this._renderer.setProperty(this._element.nativeElement, 'innerHTML', 'Detecting');
        this._renderer.setStyle(this._element.nativeElement, 'color', 'white');
      });
    }
  }

}
