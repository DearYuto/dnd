import { DragDropContext } from 'react-beautiful-dnd';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import Column from './Column';
import styled from 'styled-components';

const DragAndDropBoard = () => {
  const { columns, onDragEnd } = useDragAndDrop();

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Section>
          {columns.map((column, index) => {
            return <Column column={column} key={index} droppableId={index} />;
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
