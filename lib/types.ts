export type Genders = 'Mann' | 'Kvinne' | 'Annet';

export type Member = {
  id: number;
  name: string;
  imageHref: string;
  role: string;
  gender: Genders;
  isCurrent: boolean;
  year?: number;
};
