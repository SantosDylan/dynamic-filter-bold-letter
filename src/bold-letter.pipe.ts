import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldLetter',
  standalone: true,
})
export class PipeBolBoldLetterPipe implements PipeTransform {
  transform(name: string, searchTerm: string | null) {
    const regExp = new RegExp(searchTerm || '', 'gi');
    return name.replace(regExp, '<strong>$&</strong>');
  }
}
