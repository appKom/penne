export type GenderType = 'Mann' | 'Kvinne' | 'Annet';

export type MemberType = {
  id: number;
  name: string;
  imageHref: string;
  role: string;
  gender: GenderType;
  isCurrent: boolean;
  year: number;
};

export type ApplicationType = {
  id: number;
  purpose: string;
  description?: string;
  grantedAmount: number;
  amountApplied: number;
  recipient: string;
  dateApplied: Date;
  dateGranted: Date;
  attachment: string;
};
