import { Directive, inject, input } from '@angular/core';

import { SmoothScrollService } from '@core/services/smooth-scroll.service';

/** Link de âncora com rolagem suave. O valor é o seletor de destino (ex.: "#contato"). */
@Directive({
  selector: 'a[appScrollTo]',
  host: {
    '[attr.href]': 'target()',
    '(click)': 'onClick($event)',
  },
})
export class ScrollTo {
  public readonly target = input.required<string>({ alias: 'appScrollTo' });

  private readonly _smoothScroll = inject(SmoothScrollService);

  public onClick(event: Event): void {
    event.preventDefault();
    this._smoothScroll.scrollTo(this.target());
  }
}
