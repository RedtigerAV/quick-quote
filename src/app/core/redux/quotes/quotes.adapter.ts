import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IQuoteOrdered } from './quotes.state';

export const adapter: EntityAdapter<IQuoteOrdered> = createEntityAdapter<IQuoteOrdered>({
  selectId: quote => quote.id,
  sortComparer: (q1, q2) => q1.order - q2.order
});
