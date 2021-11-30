import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[showHideElement]'
})
export class ShowHideElementDirective {

  @Input()
  set showHideElement(value:boolean){
    if(value){
      this.el.nativeElement.style.visibility = 'visible';
      this.el.nativeElement.style.opacity = 1;
    }else{
      this.el.nativeElement.style.visibility = 'hidden';
      this.el.nativeElement.style.opacity = 0;
    }
  }

  constructor(private el: ElementRef) { 
    this.el.nativeElement.style.transition = 'visibility 0.5s, opacity 0.5s linear';
  }

}
