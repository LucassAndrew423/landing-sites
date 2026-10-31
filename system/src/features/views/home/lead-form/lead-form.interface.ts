import type { FormControl } from '@angular/forms';

import type { BusinessType, SiteStatus } from '@core/enums/lead.enum';

export interface LeadFormControls {
  name: FormControl<string>;
  businessName: FormControl<string>;
  businessType: FormControl<BusinessType | ''>;
  siteStatus: FormControl<SiteStatus>;
  message: FormControl<string>;
  honeypot: FormControl<string>;
}
