import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'valueOf'})

export class ValueOfPipe implements PipeTransform {
  transform(value: any): any {
    return parseInt(value, 10)*1000;
  }
}
