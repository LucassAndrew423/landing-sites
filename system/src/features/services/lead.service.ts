import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { SITE_CONFIG } from '@core/constants/site.const';
import type { Lead } from '@core/interfaces/lead.interface';
import { buildWhatsappUrl } from '@core/utils/whatsapp.util';

@Injectable({ providedIn: 'root' })
export class LeadService {
  public get directUrl(): string {
    return buildWhatsappUrl({ phone: SITE_CONFIG.whatsappNumber, message: SITE_CONFIG.directMessage });
  }

  private readonly _document = inject(DOCUMENT);

  public buildMessage(lead: Lead): string {
    const message = lead.message.trim();
    const lines = [
      `Olá! Meu nome é ${lead.name.trim()}.`,
      `Meu negócio: ${lead.businessName.trim()} (${lead.businessType}).`,
      `Situação atual: ${lead.siteStatus}.`,
      message.length > 0 ? `Mensagem: ${message}` : '',
      'Gostaria de um orçamento para um site.',
    ];
    return lines.filter((line) => line.length > 0).join('\n');
  }

  public sendToWhatsapp(lead: Lead): void {
    const url = buildWhatsappUrl({ phone: SITE_CONFIG.whatsappNumber, message: this.buildMessage(lead) });
    this._openInNewTab(url);
  }

  private _openInNewTab(url: string): void {
    const link = this._document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.click();
  }
}
