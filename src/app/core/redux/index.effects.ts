import { Type } from '@angular/core';
import { BookmarksEffects } from './bookmarks/bookmarks.effects';
import { PhotoTopicsEffects } from './photo-topics/photo-topics.effects';
import { PhotosEffects } from './photo/photos.effects';
import { QuoteTopicsEffects } from './quote-topics/quote-topics.effects';
import { QuotesEffects } from './quotes/quotes.effects';

export const effects: Type<any>[] = [
  QuotesEffects,
  PhotosEffects,
  BookmarksEffects,
  QuoteTopicsEffects,
  PhotoTopicsEffects
];
