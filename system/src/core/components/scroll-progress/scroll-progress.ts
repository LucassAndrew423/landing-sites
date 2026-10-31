import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { registerScrollTrigger } from '@core/utils/motion.util';

@Component({
  selector: 'app-scroll-progress',
  templateUrl: './scroll-progress.html',
  styleUrl: './scroll-progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollProgress {
  private readonly _bar = viewChild.required<ElementRef<HTMLElement>>('bar');
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      registerScrollTrigger();
      const bar = this._bar().nativeElement;
      const trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          bar.style.transform = `scaleX(${self.progress})`;
        },
      });
      this._destroyRef.onDestroy(() => trigger.kill());
    });
  }
}
