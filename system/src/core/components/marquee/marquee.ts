import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.html',
  styleUrl: './marquee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Marquee {
  public readonly items = input.required<readonly string[]>();
  public readonly copies: readonly number[] = [0, 1];
}
