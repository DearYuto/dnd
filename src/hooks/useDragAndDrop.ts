import { useState } from 'react';
import { Column } from '@/types/column';
import { DropResult } from 'react-beautiful-dnd';
import { getColumns } from '@/utils/getColumns';

const NUM_COLUMNS = 4;
const ITEMS_PER_COLUMN = 10;

export const useDragAndDrop = () => {
  const [columns, setColumns] = useState<Column[]>(
    getColumns({ itemsPerColumn: ITEMS_PER_COLUMN, numColumns: NUM_COLUMNS })
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    const sourceColumnIndex = parseInt(source.droppableId.replace('column', ''), 10);
    const destinationColumnIndex = parseInt(destination.droppableId.replace('column', ''), 10);

    const newSourceColumn = [...columns[sourceColumnIndex]];
    const newDestinationColumn = [...columns[destinationColumnIndex]];

    if (sourceColumnIndex === destinationColumnIndex) {
      const [removed] = newSourceColumn.splice(source.index, 1);
      newSourceColumn.splice(destination.index, 0, removed);

      const newColumns = Array.from(columns);
      newColumns[sourceColumnIndex] = newSourceColumn;
      setColumns(newColumns);
    } else {
      const [removed] = newSourceColumn.splice(source.index, 1);
      newDestinationColumn.splice(destination.index, 0, removed);

      const newColumns = Array.from(columns);
      newColumns[sourceColumnIndex] = newSourceColumn;
      newColumns[destinationColumnIndex] = newDestinationColumn;
      setColumns(newColumns);
    }
  };

  return {
    columns,
    onDragEnd,
  };
};
