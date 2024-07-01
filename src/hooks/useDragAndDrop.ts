import { useCallback, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import type { Column } from '@/types/column';

import { getColumns } from '@/utils/getColumns';
import { useSelectedItemsValue } from './useSelectedItemsValue';
import { isMoveAllowed } from '@/utils/isMoveAllowed';

const NUM_COLUMNS = 4;
const ITEMS_PER_COLUMN = 10;

export const useDragAndDrop = () => {
  const [columns, setColumns] = useState<Column[]>(
    getColumns({ itemsPerColumn: ITEMS_PER_COLUMN, numColumns: NUM_COLUMNS })
  );

  const selectedItemIds = useSelectedItemsValue();

  console.log(selectedItemIds);

  const onDragStart = () => {};

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      console.log(source, destination, draggableId);

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
    onDragStart,
  };
};
