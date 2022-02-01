import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStamp'
})
export class TimeStampPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
   let minutes = parseInt((value/60).toString())
   let seconds =parseInt((value%60).toString()) 

   return minutes.toString().padStart(2,'0') +":"+seconds.toString().padStart(2,'0')
  }

}
