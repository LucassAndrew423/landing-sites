import { TestBed } from '@angular/core/testing';

import { BusinessType, SiteStatus } from '@core/enums/lead.enum';
import type { Lead } from '@core/interfaces/lead.interface';
import { LeadService } from '@features/services/lead.service';

const LEAD: Lead = {
  name: 'Maria',
  businessName: 'Salão da Maria',
  businessType: BusinessType.Beauty,
  siteStatus: SiteStatus.NoSite,
  message: '',
};

describe('LeadService', () => {
  let service: LeadService;

  beforeEach(() => {
    service = TestBed.inject(LeadService);
  });

  it('should build the WhatsApp message with the lead data', () => {
    const message = service.buildMessage(LEAD);

    expect(message).toContain('Meu nome é Maria.');
    expect(message).toContain('Salão da Maria (Salão / barbearia / estética)');
    expect(message).toContain('Não tenho site');
  });

  it('should only include the free message when it is filled in', () => {
    expect(service.buildMessage(LEAD)).not.toContain('Mensagem:');
    expect(service.buildMessage({ ...LEAD, message: 'Quero um site' })).toContain('Mensagem: Quero um site');
  });
});
