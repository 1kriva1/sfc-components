import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { UIUtils } from '../../utils/ui-utils';

@Directive({
  selector: '[throwElementOnHover]'
})
export class ThrowElementOnHoverDirective {

  @Input()
  throwElementOnHover: number;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.throw(this.throwElementOnHover);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.throw(null);
  }

  private throw(value: number) {
    if (value)
      this.el.nativeElement.style.transform = `translateY(${UIUtils.getCssLikePx(value)})`;
    else
      this.el.nativeElement.style.transform = null;
  }
}
