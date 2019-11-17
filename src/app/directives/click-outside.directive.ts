import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {

  @Output('appClickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    
    if (!clickedInside && !targetElement.hasAttribute('clickOutsideNeutral')) {
      this.clickOutside.emit(null);
    }
  }

}
