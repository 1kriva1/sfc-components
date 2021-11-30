import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sfcSchemeCarouselFormationPipe'
})
export class SfcSchemeCarouselFormationPipePipe implements PipeTransform {

  private readonly FORMATION_DELIMETER_DEFAULT = '-';

  transform(value: number[], delimeter: string = null): any {
    return value.join(delimeter || this.FORMATION_DELIMETER_DEFAULT);
  }

}
