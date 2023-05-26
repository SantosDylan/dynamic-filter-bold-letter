import {
  inject,
  Pipe,
  PipeTransform,
  Sanitizer,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'boldLetter',
  standalone: true,
})
export class PipeBolBoldLetterPipe implements PipeTransform {
  #sanitizer = inject(DomSanitizer);
  transform(name: string, searchTerm: string | null) {
    return this.sanitize(this.replace(name, searchTerm));
  }

  replace(name: string, searchTerm: string | null) {
    const regExp = new RegExp(`${searchTerm}` || '', 'gi');
    return name.replace(regExp, '<strong>$&</strong>');
  }

  sanitize(str: string) {
    return this.#sanitizer.sanitize(SecurityContext.HTML, str);
  }
}
