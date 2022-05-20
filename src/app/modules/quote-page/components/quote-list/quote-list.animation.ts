import { animate, style, query, group } from '@angular/animations';

// prettier-ignore
export const toNextQuoteAnimation = [
  // Should set position: absolute to animate :enter element inside ng-container properly
  query(':enter, :leave', style({ position: 'absolute' }), { optional: true }),
  group([
    query(':leave', [
      style({ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }),
      animate('1s cubic-bezier(.75,0,.75,0)', style({ opacity: 0, transform: 'translate3d(-100%, 0, 0) scale(.4)' }))
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translate3d(100%, 0, 0) scale(.4)' }),
      animate('1s .5s cubic-bezier(.25,.1,.25,1)', style({ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' })),
    ], { optional: true }),
  ])
];

// prettier-ignore
export const toPreviousQuoteAnimation = [
  // Should set position: absolute to animate :enter element inside ng-container properly
  query(':enter, :leave', style({ position: 'absolute' }), { optional: true }),
  group([
    query(':leave', [
      style({ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }),
      animate('1s cubic-bezier(.75,0,.75,0)', style({ opacity: 0, transform: 'translate3d(100%, 0, 0) scale(.4)' }))
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translate3d(-100%, 0, 0) scale(.4)' }),
      animate('1s .5s cubic-bezier(.25,.1,.25,1)', style({ opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' })),
    ], { optional: true }),
  ])
];
