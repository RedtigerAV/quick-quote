import { animate, state, style, transition } from '@angular/animations';

export enum AnimationStateEnum {
  LEAVE = 'leave',
  ENTER = 'enter'
}
export const ANIMATION_TRANSITION = '400ms ease-in-out';
export const DEFAULT_ANIMATION_PARAMS = { translate: 'translate3d(0, 0, 0)' };

export const backdropFade = [
  state(`*, void, ${AnimationStateEnum.LEAVE}`, style({ opacity: 0 })),
  state(AnimationStateEnum.ENTER, style({ opacity: 1 })),
  transition('* => enter', animate(ANIMATION_TRANSITION)),
  transition('enter <=> leave', animate(ANIMATION_TRANSITION))
];

export const panelFade = [
  state(`void, ${AnimationStateEnum.LEAVE}`, style({ opacity: 0, transform: '{{ translate }}' }), {
    params: DEFAULT_ANIMATION_PARAMS
  }),
  state(AnimationStateEnum.ENTER, style({ opacity: 1 })),
  transition('void => enter', animate(ANIMATION_TRANSITION)),
  transition('enter <=> leave', animate(ANIMATION_TRANSITION)),
  transition(':enter', animate(ANIMATION_TRANSITION, style({ border: '2px solid red' }))),
  transition(':leave', animate(ANIMATION_TRANSITION, style({ border: '2px solid green' })))
];
