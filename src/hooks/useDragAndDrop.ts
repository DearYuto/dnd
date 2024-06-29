import { useCallback, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import type { Column } from '@/types/column';

import { getColumns } from '@/utils/getColumns';
import { Item } from '@/types/item';

const NUM_COLUMNS = 4;
const ITEMS_PER_COLUMN = 10;

const isMoveAllowed = (
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

export const useDragAndDrop = () => {
  const [columns, setColumns] = useState<Column[]>(
    getColumns({ itemsPerColumn: ITEMS_PER_COLUMN, numColumns: NUM_COLUMNS })
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      if (!destination) return;

      const sourceColumnIndex = parseInt(source.droppableId.replace('column', ''), 10);
      const destinationColumnIndex = parseInt(destination.droppableId.replace('column', ''), 10);

      const newColumns = [...columns];
      const newSourceColumn = [...columns[sourceColumnIndex]];
      const newDestinationColumn = [...columns[destinationColumnIndex]];

      if (
        !isMoveAllowed(
          sourceColumnIndex,
          destinationColumnIndex,
          source.index,
          destination.index,
          newColumns
        )
      ) {
        // TODO 이동 불가 스타일 적용
        return;
      }

      const [removed] = newSourceColumn.splice(source.index, 1);
      newColumns[sourceColumnIndex] = newSourceColumn;

      if (sourceColumnIndex === destinationColumnIndex) {
        newSourceColumn.splice(destination.index, 0, removed);
      } else {
        newDestinationColumn.splice(destination.index, 0, removed);
        newColumns[destinationColumnIndex] = newDestinationColumn;
      }

      setColumns(newColumns);
    },
    [columns]
  );

  return {
    columns,
    onDragEnd,
  };
};
