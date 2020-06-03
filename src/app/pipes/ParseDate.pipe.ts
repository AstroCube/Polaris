import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'unixDate'})

export class ParseDatePipe implements PipeTransform {
  transform(value: any): any {
    return parseInt((new Date(value).getTime() / 1000).toFixed(0));
  }
}
