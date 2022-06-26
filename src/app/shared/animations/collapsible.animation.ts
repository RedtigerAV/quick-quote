import { AUTO_STYLE, AnimationTriggerMetadata, animate, state, style, transition, trigger } from '@angular/animations';

export enum CollapsibleAnimationStateEnum {
  Collapsed = 'collapsed',
  Expanded = 'expanded'
}

export function collapsible(durationMs: number): AnimationTriggerMetadata {
  return trigger('collapsible', [
    state(
      CollapsibleAnimationStateEnum.Expanded,
      style({
        height: AUTO_STYLE,
        paddingTop: AUTO_STYLE,
        paddingBottom: AUTO_STYLE,
        opacity: 1
      })
    ),
    state(
      CollapsibleAnimationStateEnum.Collapsed,
      style({
        height: '0px',
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0
      })
    ),
    transition(
      `${CollapsibleAnimationStateEnum.Expanded} => ${CollapsibleAnimationStateEnum.Collapsed}`,
      animate(`${durationMs}ms ease-out`)
    ),
    transition(
      `${CollapsibleAnimationStateEnum.Collapsed} => ${CollapsibleAnimationStateEnum.Expanded}`,
      animate(`${durationMs}ms ease-in`)
    )
  ]);
}
