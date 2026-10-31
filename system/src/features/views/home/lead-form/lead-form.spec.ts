import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { BusinessType, SiteStatus } from '@core/enums/lead.enum';
import { LeadService } from '@features/services/lead.service';
import { LeadForm } from '@features/views/home/lead-form/lead-form';

describe('LeadForm', () => {
  let component: LeadForm;
  let sendSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [LeadForm] });
    sendSpy = vi.spyOn(TestBed.inject(LeadService), 'sendToWhatsapp').mockImplementation(() => undefined);
    component = TestBed.createComponent(LeadForm).componentInstance;
  });

  it('should not send and should flag required fields when the form is empty', () => {
    component.submit();

    expect(sendSpy).not.toHaveBeenCalled();
    expect(component.isSent()).toBe(false);
    expect(component.hasError('name')).toBe(true);
    expect(component.hasError('businessName')).toBe(true);
    expect(component.hasError('businessType')).toBe(true);
  });

  it('should send the lead to WhatsApp and show the sent feedback when the form is valid', () => {
    component.form.patchValue({ name: 'Maria', businessName: 'Salão da Maria', businessType: BusinessType.Beauty });

    component.submit();

    expect(sendSpy).toHaveBeenCalledWith({
      name: 'Maria',
      businessName: 'Salão da Maria',
      businessType: BusinessType.Beauty,
      siteStatus: SiteStatus.NoSite,
      message: '',
    });
    expect(component.isSent()).toBe(true);
  });

  it('should ignore submissions that fill the honeypot field', () => {
    component.form.patchValue({ name: 'Bot', businessName: 'Bot', businessType: BusinessType.Other, honeypot: 'spam' });

    component.submit();

    expect(sendSpy).not.toHaveBeenCalled();
  });
});
