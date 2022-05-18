import { Type } from '@angular/core';
import { MediaEffects } from './media/media.effects';
import { QuotesEffects } from './quotes/quotes.effects';

export const effects: Type<any>[] = [QuotesEffects, MediaEffects];
