import { Pipe, PipeTransform } from '@angular/core';

export interface TruncateLengths {
  LongText: number;
  LongTextLargeDisplay: number;
  LongTextMobileDisplay: number;
  ShortText: number;
  ShortTextLargeDisplay: number;
  ShortTextMobileDisplay: number;
}

export const TruncateLengthsDefault: TruncateLengths = {
  LongText: 250,
  LongTextLargeDisplay: 330,
  LongTextMobileDisplay: 150,
  ShortText: 100,
  ShortTextLargeDisplay: 200,
  ShortTextMobileDisplay: 50,
};

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (!value) return '';
    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
  }
}