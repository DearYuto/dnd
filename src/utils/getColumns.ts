import { Column } from '@/types/column';
import { ColumnItem } from './types';
import { itemGenerator } from './genDragAndDropItem';

const createColumns = ({ numColumns, itemsPerColumn }: ColumnItem): Column[] => {
  const generator = itemGenerator(1);
  return Array.from({ length: numColumns }, () =>
    Array.from({ length: itemsPerColumn }, () => generator.next().value)
  );
};

export const getColumns = ({ numColumns, itemsPerColumn }: ColumnItem): Column[] => {
  return createColumns({ numColumns, itemsPerColumn });
};
