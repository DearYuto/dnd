import { Item } from '@/types/item';

export function* itemGenerator(start: number): Generator<Item> {
  let id = start;

  while (true) {
    yield { id: `${id}`, content: `Item ${id}` };
    id++;
  }
}
