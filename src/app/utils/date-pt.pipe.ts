import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePt',
  standalone: true
})
export class DatePtPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR').format(date);
  }
}
