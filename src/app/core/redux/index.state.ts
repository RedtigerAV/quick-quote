import { IMediaState } from './media/media.state';
import { IQuotesState } from './quotes/quotes.state';

export interface IState {
  quotes: IQuotesState;
  media: IMediaState;
}
