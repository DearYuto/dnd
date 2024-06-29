import { Item } from './item';

export type Column = {
  id: number;
  title: string;
  items: Item[];
};
