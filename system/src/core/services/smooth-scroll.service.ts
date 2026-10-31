import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { HEADER_OFFSET_PX, SMOOTH_SCROLL_LERP } from '@core/constants/motion.const';
import { prefersReducedMotion, registerScrollTrigger } from '@core/utils/motion.util';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly _document = inject(DOCUMENT);
  private readonly _tick = (time: number): void => {
    this._lenis?.raf(time * 1000);
  };

  private _lenis: Lenis | undefined;

  public init(): void {
    if (this._lenis || prefersReducedMotion()) {
      return;
    }
    registerScrollTrigger();
    const lenis = new Lenis({ lerp: SMOOTH_SCROLL_LERP });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(this._tick);
    gsap.ticker.lagSmoothing(0);
    this._lenis = lenis;
  }

  public scrollTo(target: string): void {
    const element = this._document.querySelector<HTMLElement>(target);
    if (!element) {
      return;
    }
    if (this._lenis) {
      this._lenis.scrollTo(element, { offset: -HEADER_OFFSET_PX });
      return;
    }
    const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
