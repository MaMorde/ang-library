import { IAuthor } from './author';

export interface IBook {
  id?: number;
  authors: IAuthor[];
  genre: string;
  name: string;
}
