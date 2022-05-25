import { IQuote } from '@core/models/quote.model';

export abstract class QuoteHelper {
  public static getAuthoInfo({ authorName, authorNationality, authorProfession }: IQuote): string {
    if (authorName && authorNationality && authorProfession) {
      return `${authorName}, ${authorNationality} ${authorProfession}`;
    } else if (authorName && authorProfession) {
      return `${authorName}, ${authorProfession}`;
    }

    return authorName;
  }
}
