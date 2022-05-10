import { IBackgroundImagesState } from './background-images/background-images.state';
import { IQuotesState } from './quotes/quotes.state';

export interface IState {
  quotes: IQuotesState;
  backgroundImages: IBackgroundImagesState;
}
