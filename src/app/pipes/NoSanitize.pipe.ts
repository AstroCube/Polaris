import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'noSanitize' })
export class NoSanitizePipe implements PipeTransform {

  constructor(
    private _domSanitizer: DomSanitizer
  ) {}
  transform(html: string): SafeHtml {
    return this._domSanitizer.bypassSecurityTrustHtml(html);
  }
}
