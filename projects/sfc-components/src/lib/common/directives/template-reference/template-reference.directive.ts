import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[template]'
})
export class TemplateReferenceDirective {

  @Input('template')
  templateName: string = '';

  constructor( public readonly template: TemplateRef<any>) { }

}
