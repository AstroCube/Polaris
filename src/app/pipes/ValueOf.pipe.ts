import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'valueOf'})

export class ValueOfPipe implements PipeTransform {
  transform(value: string): number {
    return parseInt(value, 10)*1000;
  }
}
