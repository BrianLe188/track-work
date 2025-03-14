export interface IMail {
  _id: string;
  name: string;
  email: string;
  subject: string;
  date: string;
  teaser: string;
}

export type Mails = IMail[];
