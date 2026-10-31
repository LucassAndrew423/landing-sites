export interface SiteConfig {
  readonly brandName: string;
  readonly whatsappNumber: string;
  readonly directMessage: string;
}

export interface BrandParts {
  readonly first: string;
  readonly rest: string;
}

export interface NavLink {
  readonly label: string;
  readonly target: string;
}
