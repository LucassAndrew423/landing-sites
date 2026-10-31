import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-float',
  templateUrl: './whatsapp-float.html',
  styleUrl: './whatsapp-float.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappFloat {
  public readonly url = input.required<string>();
}
