export interface ContentCard {
  readonly icon?: string;
  readonly title: string;
  readonly description: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface HeroWord {
  readonly text: string;
  readonly isAccent: boolean;
}
