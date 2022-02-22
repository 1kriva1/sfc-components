import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CommonConstants } from '../../constants/common-constants';

@Directive({
  selector: '[showHideElement]'
})
export class ShowHideElementDirective {

  @Input('transition-delay')
  set transitionDelay(delay: number) {
    this.el.nativeElement.style.transition = `visibility ${delay}s, opacity ${delay}s linear`;
  };

  @Input()
  set showHideElement(value: boolean) {
    if (value) {
      this.el.nativeElement.style.visibility = 'visible';
      this.el.nativeElement.style.opacity = 1;
    } else {
      this.el.nativeElement.style.visibility = 'hidden';
      this.el.nativeElement.style.opacity = 0;
    }
  }

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = `visibility ${CommonConstants.SHOW_HIDE_TRANSITION_DELAY}s, opacity ${CommonConstants.SHOW_HIDE_TRANSITION_DELAY}s linear`;
  }
}
