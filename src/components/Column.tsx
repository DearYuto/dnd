import { Droppable } from 'react-beautiful-dnd';

import { getListStyle } from '@/styles/getListStyle';
import type { Column } from '@/types/column';
import Item from './Item';

type Props = {
  column: Column;
  droppableId: number;
};

const Column = ({ droppableId, column }: Props) => {
  return (
    <Droppable droppableId={`column${droppableId}`}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {column.map((item, index) => (
            <Item item={item} index={index} key={item.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
