import { animate, animateChild, query, style, transition } from '@angular/animations';

const defaultState = { height: '*', opacity: 1, paddingTop: '*', paddingBottom: '*' };
const shrinkState = { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 };
const ANIMATION_DURATION = '300ms ease-in-out';

export const nestedTransition = transition('* => *', [query('@*', animateChild({ duration: ANIMATION_DURATION }))]);

export const shrinkInTransition = transition('void => *', [
  style(shrinkState),
  animate(ANIMATION_DURATION, style(defaultState))
]);

export const shrinkOutTransition = transition('* => void', [
  style(defaultState),
  animate(ANIMATION_DURATION, style(shrinkState))
]);
