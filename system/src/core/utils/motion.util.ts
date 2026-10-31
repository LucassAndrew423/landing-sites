import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { REDUCED_MOTION_QUERY } from '@core/constants/motion.const';

export function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function registerScrollTrigger(): void {
  gsap.registerPlugin(ScrollTrigger);
}
