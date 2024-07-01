import { DragDropContext } from 'react-beautiful-dnd';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import Column from './Column';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useSelectedItemsUpdate } from '@/hooks/useSelectedItemsUpdate';
import { useSelectedItemsValue } from '@/hooks/useSelectedItemsValue';

const DragAndDropBoard = () => {
  const { columns, onDragEnd } = useDragAndDrop();

  const setSelectedItemIds = useSelectedItemsUpdate();

  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (target.classList.contains('column') || target.classList.contains('item')) {
        return;
      }

      setSelectedItemIds(() => []);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setSelectedItemIds]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Section ref={boardRef}>
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
