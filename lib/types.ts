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
  description?: string | null;
  grantedAmount: number;
  amountApplied: number;
  recipient: string;
  dateApplied: Date;
  dateGranted: Date;
  attachment: string | null;
  approved: boolean;
};

export type CompositionType = {
  id?: number;
  company: string;
  percentage: number;
  category: string;
};

export type GraphType = {
  id?: number;
  date: Date;
  value: number;
};
