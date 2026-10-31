import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { registerScrollTrigger } from '@core/utils/motion.util';

/** Atualiza a variável CSS --fill (0 a 1) conforme o elemento atravessa a tela, para linhas que "se desenham". */
@Directive({ selector: '[appScrollFill]' })
export class ScrollFill {
  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      registerScrollTrigger();
      const trigger = ScrollTrigger.create({
        trigger: this._element,
        start: 'top 70%',
        end: 'bottom 60%',
        onUpdate: (self) => this._element.style.setProperty('--fill', self.progress.toFixed(3)),
      });
      this._destroyRef.onDestroy(() => trigger.kill());
    });
  }
}
