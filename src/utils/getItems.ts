import { Item } from '@/types/item';

const createItem = (index: number): Item => ({
  id: `item-${index}`,
  content: `item ${index}`,
});

export const getItems = (count: number): Item[] =>
  Array.from({ length: count }, (_, index) => createItem(index));
