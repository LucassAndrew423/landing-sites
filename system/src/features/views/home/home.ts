import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Marquee } from '@core/components/marquee/marquee';
import { Magnetic } from '@core/directives/magnetic.directive';
import { Reveal } from '@core/directives/reveal.directive';
import { ScrollFill } from '@core/directives/scroll-fill.directive';
import { ScrollTo } from '@core/directives/scroll-to.directive';
import { Tilt } from '@core/directives/tilt.directive';
import { LeadService } from '@features/services/lead.service';
import {
  BENEFITS,
  FAQ_ITEMS,
  HERO_BADGES,
  HERO_TITLE,
  HERO_WORDS,
  INCLUDED_ITEMS,
  MARQUEE_ITEMS,
  STEPS,
} from '@features/views/home/home.const';
import { HeroMockup } from '@features/views/home/hero-mockup/hero-mockup';
import { LeadForm } from '@features/views/home/lead-form/lead-form';

@Component({
  selector: 'app-home',
  imports: [Marquee, Magnetic, Reveal, ScrollFill, ScrollTo, Tilt, HeroMockup, LeadForm],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public readonly heroTitle = HERO_TITLE;
  public readonly heroWords = HERO_WORDS;
  public readonly heroBadges = HERO_BADGES;
  public readonly marqueeItems = MARQUEE_ITEMS;
  public readonly benefits = BENEFITS;
  public readonly steps = STEPS;
  public readonly includedItems = INCLUDED_ITEMS;
  public readonly faqItems = FAQ_ITEMS;
  public readonly whatsappUrl = inject(LeadService).directUrl;
}
