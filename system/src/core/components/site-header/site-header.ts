import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HEADER_HIDE_THRESHOLD_PX, HEADER_SCROLLED_THRESHOLD_PX } from '@core/constants/motion.const';
import { NAV_LINKS } from '@core/constants/navigation.const';
import { Magnetic } from '@core/directives/magnetic.directive';
import { ScrollTo } from '@core/directives/scroll-to.directive';
import type { BrandParts } from '@core/interfaces/site.interface';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, ScrollTo, Magnetic],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  public readonly brandName = input.required<string>();
  public readonly navLinks = NAV_LINKS;
  public readonly isScrolled = signal(false);
  public readonly isHidden = signal(false);

  public readonly brandParts = computed<BrandParts>(() => {
    const [first = '', ...rest] = this.brandName().trim().split(' ');
    return { first, rest: rest.join(' ') };
  });

  private readonly _destroyRef = inject(DestroyRef);

  private _lastScrollY = 0;

  constructor() {
    afterNextRender(() => {
      // Listener nativo e passivo: só os signals que realmente mudam acionam o Angular.
      const onScroll = (): void => this._updateScrollState();
      window.addEventListener('scroll', onScroll, { passive: true });
      this._destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  private _updateScrollState(): void {
    const currentY = window.scrollY;
    this.isScrolled.set(currentY > HEADER_SCROLLED_THRESHOLD_PX);
    this.isHidden.set(currentY > this._lastScrollY && currentY > HEADER_HIDE_THRESHOLD_PX);
    this._lastScrollY = currentY;
  }
}
