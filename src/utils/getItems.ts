import { Item } from '@/types/item';

export const getItems = (count: number): Item[] =>
  Array.from({ length: count })
    .fill(0)
    .map((_, index) => ({
      id: `item-${index}`,
      content: `item ${index}`,
    }));
