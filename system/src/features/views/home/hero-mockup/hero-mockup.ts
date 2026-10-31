import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Parallax } from '@core/directives/parallax.directive';
import { Tilt } from '@core/directives/tilt.directive';

@Component({
  selector: 'app-hero-mockup',
  imports: [Parallax, Tilt],
  templateUrl: './hero-mockup.html',
  styleUrl: './hero-mockup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroMockup {}
