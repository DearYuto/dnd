import { useCallback, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import type { Column } from '@/types/column';

import { getColumns } from '@/utils/getColumns';

const NUM_COLUMNS = 4;
const ITEMS_PER_COLUMN = 10;

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
