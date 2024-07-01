import { Column } from '@/types/column';
import { Item } from '@/types/item';

export const isMoveAllowed = (
  sourceColumnIndex: number,
  destinationColumnIndex: number,
  sourceIndex: number,
  destinationIndex: number,
  columns: Column[]
) => {
  // 첫번째 컬럼 -> 세번째 컬럼 이동 불가
  if (sourceColumnIndex === 0 && destinationColumnIndex === 2) {
    return false;
  }

  const sourceItem = columns[sourceColumnIndex][sourceIndex];
  const destinationItem = columns[destinationColumnIndex][destinationIndex];

  // 짝수 아이템은 다른 짝수 아이템 이동 불가
  const isEven = (item: Item) => parseInt(item.id) % 2 === 0;
  if (isEven(sourceItem) && isEven(destinationItem)) {
    return false;
  }

  return true;
};
