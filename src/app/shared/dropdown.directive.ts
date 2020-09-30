import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  /*isClicked=false;
  constructor(private elementRef:ElementRef, private renderer:Renderer2) { }
  @HostListener('click') clickListener(eventData: Event){
    if(!this.isClicked){
      this.isClicked=true;
      this.renderer.addClass(this.elementRef.nativeElement,'open');
    }
    else{
      this.isClicked=false;
      this.renderer.removeClass(this.elementRef.nativeElement,'open');
    }
  }*/
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}
