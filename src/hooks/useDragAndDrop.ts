import { useCallback, useState } from 'react';
import { DragUpdate, DropResult } from 'react-beautiful-dnd';

import type { Column } from '@/types/column';

import { getColumns } from '@/utils/getColumns';
// import { useSelectedItemsValue } from './useSelectedItemsValue';
import { isMoveAllowed } from '@/utils/isMoveAllowed';

const NUM_COLUMNS = 4;
const ITEMS_PER_COLUMN = 10;

export const useDragAndDrop = () => {
  const [columns, setColumns] = useState<Column[]>(
    getColumns({ itemsPerColumn: ITEMS_PER_COLUMN, numColumns: NUM_COLUMNS })
  );

  const [moveNotAllowed, setMoveNotAllowed] = useState(false);

  // TODO 멀티 드래그앤드롭 구현
  // const selectedItemIds = useSelectedItemsValue();

  const onDragStart = () => {
    setMoveNotAllowed(false);
  };

  const onDragUpdate = useCallback(
    (update: DragUpdate) => {
      const { source, destination } = update;

      if (!destination) return;

      const sourceColumnIndex = parseInt(source.droppableId.replace('column', ''), 10);
      const destinationColumnIndex = parseInt(destination.droppableId.replace('column', ''), 10);
      const newColumns = [...columns];

      if (
        !isMoveAllowed(
          sourceColumnIndex,
          destinationColumnIndex,
          source.index,
          destination.index,
          newColumns
        )
      ) {
        setMoveNotAllowed(() => true);
        return;
      }

      setMoveNotAllowed(() => false);
    },
    [columns]
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
        setMoveNotAllowed(() => false);
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
      setMoveNotAllowed(false);
    },
    [columns]
  );

  return {
    columns,
    moveNotAllowed,
    onDragEnd,
    onDragStart,
    onDragUpdate,
  };
};
