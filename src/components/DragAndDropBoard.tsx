import { DragDropContext } from 'react-beautiful-dnd';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import Column from './Column';
import styled from 'styled-components';
import { useCallback, useEffect } from 'react';
import { useSelectedItemsUpdate } from '@/hooks/useSelectedItemsUpdate';

const isClickInsideColumnOrItem = (target: HTMLElement): boolean => {
  return Boolean(target.closest('.column')) || Boolean(target.closest('.item'));
};

const DragAndDropBoard = () => {
  const { columns, onDragEnd } = useDragAndDrop();

  const setSelectedItemIds = useSelectedItemsUpdate();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isClickInsideColumnOrItem(target)) {
        return;
      }
      setSelectedItemIds([]);
    },
    [setSelectedItemIds]
  );

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

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
