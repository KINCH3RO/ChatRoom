import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';


@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {


  @Output() ScrolledUp = new EventEmitter()
  @Output() ScrolledDown = new EventEmitter()

  @Input() scrollUpDistance =0.1
  @Input() delay =0


  private previousValue = null
 
  @HostListener("scroll", ["$event"])
  async onScrollUp(event) {

    let scrollTop = event.target.scrollTop
    let scrollHeight=  this.el.nativeElement.scrollHeight
  
    if(this.scrollUpDistance<0 || this.scrollUpDistance>1){
      throw new Error("scrollUpDistance need to be between 0 and 1");
    }
    if(this.delay<0){
      throw new Error("delay cant be null")
    }
    
    if (scrollTop < this.previousValue && scrollTop<=scrollHeight*this.scrollUpDistance) {

      await new Promise(x=>setTimeout(x,this.delay))
      this.ScrolledUp.emit("desiredPosReached")
    } 

    if(scrollTop >this.previousValue){
      this.ScrolledDown.emit("scrolling down")
  
      
    }
    this.previousValue = scrollTop


  }


  constructor(private el: ElementRef) { }

}
