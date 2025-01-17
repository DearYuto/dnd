import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import Column from './Column';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useSelectedItemsUpdate } from '@/hooks/useSelectedItemsUpdate';
import { useClickOutside } from '@/hooks/useClickOutside';

const DragAndDropBoard = () => {
  const { columns, onDragEnd, onDragStart, onDragUpdate, moveNotAllowed } = useDragAndDrop();

  const setSelectedItemIds = useSelectedItemsUpdate();
  useClickOutside(() => setSelectedItemIds([]));

  return (
    <>
      <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
        <Section>
          {columns.map((column, index) => {
            return (
              <Column
                moveNotAllowed={moveNotAllowed}
                column={column}
                key={index}
                droppableId={index}
              />
            );
          })}
        </Section>
      </DragDropContext>
    </>
  );
};

export default DragAndDropBoard;

const Section = styled.section`
  display: flex;
  justify-content: center;
`;
