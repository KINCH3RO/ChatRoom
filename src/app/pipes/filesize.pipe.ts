import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let parsedValue = parseInt(value)
    let kiloBytesValue = parseInt(value)/1000
    let megaBytesValue = kiloBytesValue/1000

    if(megaBytesValue>=1){
      return megaBytesValue.toFixed(2) +"MB"
    }

    return kiloBytesValue.toFixed(2) +"KB";
  }

}
