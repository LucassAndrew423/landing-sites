import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ScrollProgress } from '@core/components/scroll-progress/scroll-progress';
import { SiteHeader } from '@core/components/site-header/site-header';
import { WhatsappFloat } from '@core/components/whatsapp-float/whatsapp-float';
import { SITE_CONFIG } from '@core/constants/site.const';
import { SmoothScrollService } from '@core/services/smooth-scroll.service';
import { LeadService } from '@features/services/lead.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, WhatsappFloat, ScrollProgress],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  public readonly brandName = SITE_CONFIG.brandName;
  public readonly currentYear = new Date().getFullYear();
  public readonly whatsappUrl = inject(LeadService).directUrl;

  private readonly _smoothScroll = inject(SmoothScrollService);

  constructor() {
    afterNextRender(() => this._smoothScroll.init());
  }
}
