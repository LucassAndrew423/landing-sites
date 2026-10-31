import type { BusinessType, SiteStatus } from '@core/enums/lead.enum';

export interface Lead {
  readonly name: string;
  readonly businessName: string;
  readonly businessType: BusinessType;
  readonly siteStatus: SiteStatus;
  readonly message: string;
}
