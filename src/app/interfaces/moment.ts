export interface IMoment {
  id?: number;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  comments?: IComments[];
}

interface IComments {
  username: string;
  text: string;
}
