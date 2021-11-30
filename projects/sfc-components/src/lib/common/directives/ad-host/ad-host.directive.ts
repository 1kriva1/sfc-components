import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]'
})
export class AdHostDirective {

  @Input('host-id')
  hostId: any;

  constructor(public viewContainerRef: ViewContainerRef) { }

}
