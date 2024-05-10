import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AcsAnimationCurves,
  AcsAnimationDurations,
} from '@acs/animations/defaults';

const slideInTop = trigger('slideInTop', [
  state(
    'void',
    style({
      transform: 'translate3d(0, -100%, 0)',
    })
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  transition('void => false', []),

  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `${AcsAnimationDurations.entering} ${AcsAnimationCurves.deceleration}`,
    },
  }),
]);

const slideInBottom = trigger('slideInBottom', [
  state(
    'void',
    style({
      transform: 'translate3d(0, 100%, 0)',
    })
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  transition('void => false', []),

  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `${AcsAnimationDurations.entering} ${AcsAnimationCurves.deceleration}`,
    },
  }),
]);

const slideInLeft = trigger('slideInLeft', [
  state(
    'void',
    style({
      transform: 'translate3d(-100%, 0, 0)',
    })
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  transition('void => false', []),

  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `${AcsAnimationDurations.entering} ${AcsAnimationCurves.deceleration}`,
    },
  }),
]);

const slideInRight = trigger('slideInRight', [
  state(
    'void',
    style({
      transform: 'translate3d(100%, 0, 0)',
    })
  ),

  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  transition('void => false', []),

  transition('void => *', animate('{{timings}}'), {
    params: {
      timings: `${AcsAnimationDurations.entering} ${AcsAnimationCurves.deceleration}`,
    },
  }),
]);

const slideOutTop = trigger('slideOutTop', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      transform: 'translate3d(0, -100%, 0)',
    })
  ),

  transition('false => void', []),

  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `${AcsAnimationDurations.exiting} ${AcsAnimationCurves.acceleration}`,
    },
  }),
]);

const slideOutBottom = trigger('slideOutBottom', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      transform: 'translate3d(0, 100%, 0)',
    })
  ),

  transition('false => void', []),

  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `${AcsAnimationDurations.exiting} ${AcsAnimationCurves.acceleration}`,
    },
  }),
]);

const slideOutLeft = trigger('slideOutLeft', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      transform: 'translate3d(-100%, 0, 0)',
    })
  ),

  transition('false => void', []),

  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `${AcsAnimationDurations.exiting} ${AcsAnimationCurves.acceleration}`,
    },
  }),
]);

const slideOutRight = trigger('slideOutRight', [
  state(
    '*',
    style({
      transform: 'translate3d(0, 0, 0)',
    })
  ),

  state(
    'void',
    style({
      transform: 'translate3d(100%, 0, 0)',
    })
  ),

  transition('false => void', []),

  transition('* => void', animate('{{timings}}'), {
    params: {
      timings: `${AcsAnimationDurations.exiting} ${AcsAnimationCurves.acceleration}`,
    },
  }),
]);

export {
  slideInTop,
  slideInBottom,
  slideInLeft,
  slideInRight,
  slideOutTop,
  slideOutBottom,
  slideOutLeft,
  slideOutRight,
};
