import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';
import { gsap } from 'gsap';

import { prefersReducedMotion, registerScrollTrigger } from '@core/utils/motion.util';

/** Move o elemento verticalmente enquanto a página rola. O valor é o deslocamento total em % da altura dele. */
@Directive({ selector: '[appParallax]' })
export class Parallax {
  public readonly shift = input<number, number | string>(0, {
    alias: 'appParallax',
    transform: (value) => numberAttribute(value, 0),
  });

  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (prefersReducedMotion()) {
        return;
      }
      registerScrollTrigger();
      const startsInFirstScreen = this._element.getBoundingClientRect().top + window.scrollY < window.innerHeight;
      const context = gsap.context(() => {
        gsap.to(this._element, {
          yPercent: this.shift(),
          ease: 'none',
          scrollTrigger: {
            trigger: this._element,
            start: startsInFirstScreen ? 'top top' : 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }, this._element);
      this._destroyRef.onDestroy(() => context.revert());
    });
  }
}
