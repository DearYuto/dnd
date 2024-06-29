import { DragDropContext } from 'react-beautiful-dnd';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import Column from './Column';

const DragAndDropBoard = () => {
  const { columns, onDragEnd } = useDragAndDrop();

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <section style={{ display: 'flex' }}>
          {columns.map((column, index) => {
            return <Column column={column} key={index} droppableId={index} />;
          })}
        </section>
      </DragDropContext>
    </>
  );
};

export default DragAndDropBoard;
