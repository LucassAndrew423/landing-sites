import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FORM_FEEDBACK_MS } from '@core/constants/motion.const';
import { BusinessType, SiteStatus } from '@core/enums/lead.enum';
import { notBlankValidator } from '@core/utils/form-validators.util';
import { LeadService } from '@features/services/lead.service';
import type { LeadFormControls } from '@features/views/home/lead-form/lead-form.interface';
import type { RequiredLeadField } from '@features/views/home/lead-form/lead-form.type';

@Component({
  selector: 'app-lead-form',
  imports: [ReactiveFormsModule],
  templateUrl: './lead-form.html',
  styleUrl: './lead-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadForm {
  public readonly businessTypes: readonly BusinessType[] = Object.values(BusinessType);
  public readonly siteStatuses: readonly SiteStatus[] = Object.values(SiteStatus);
  public readonly isSent = signal(false);

  public readonly form = new FormGroup<LeadFormControls>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, notBlankValidator] }),
    businessName: new FormControl('', { nonNullable: true, validators: [Validators.required, notBlankValidator] }),
    businessType: new FormControl<BusinessType | ''>('', { nonNullable: true, validators: [Validators.required] }),
    siteStatus: new FormControl(SiteStatus.NoSite, { nonNullable: true }),
    message: new FormControl('', { nonNullable: true }),
    honeypot: new FormControl('', { nonNullable: true }),
  });

  private readonly _leadService = inject(LeadService);

  private _feedbackTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this._feedbackTimer));
  }

  public hasError(field: RequiredLeadField): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  public submit(): void {
    const { name, businessName, businessType, siteStatus, message, honeypot } = this.form.getRawValue();
    if (honeypot.length > 0) {
      return;
    }
    if (this.form.invalid || businessType === '') {
      this.form.markAllAsTouched();
      return;
    }
    this._leadService.sendToWhatsapp({ name, businessName, businessType, siteStatus, message });
    this.isSent.set(true);
    clearTimeout(this._feedbackTimer);
    this._feedbackTimer = setTimeout(() => this.isSent.set(false), FORM_FEEDBACK_MS);
  }
}
