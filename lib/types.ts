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

export type GraphType = {
  date: string;
  onlineFondet: number;
  osebx: number;
};

export type OnlineFondType = {
  date: Date;
  company: string;
  percentage: number;
  category: string;
};
