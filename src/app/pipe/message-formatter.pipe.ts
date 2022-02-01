import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageFormatter'
})
export class MessageFormatterPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    return this.replaceText(value);
  }

  replaceText(text) {
    const regex1 = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}(\.|:)?[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gm

    let foundUrls:string[] = text.match(regex1)




    if (!foundUrls) {
      return text
    }

    foundUrls = foundUrls.map(url=>{
      return  "<a rel='noopener noreferrer' target='_blank' href='" + url + "' class='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition' >" +url + "</a> ";
    })
    text= foundUrls.join("\n")
    
    

    return text
  }

}
