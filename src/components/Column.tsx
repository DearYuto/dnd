import styled from 'styled-components';
import { Droppable, Id } from 'react-beautiful-dnd';

import type { Column } from '@/types/column';
import Item from './Item';
import { useState } from 'react';

type Props = {
  column: Column;
  droppableId: number;
};

const Column = ({ droppableId, column }: Props) => {
  const [selectedItemIds, setSelectedItemIds] = useState<Id[]>([]);

  const onClick = (item: Item) => () => {
    setSelectedItemIds((prevIds) => {
      if (prevIds.includes(item.id)) {
        return prevIds.filter((id) => id !== item.id);
      }

      return [...prevIds, item.id];
    });
  };

  return (
    <Droppable droppableId={`column${droppableId}`}>
      {(provided, snapshot) => (
        <ListContainer
          $isDraggingOver={snapshot.isDraggingOver}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {column.map((item, index) => (
            <Item onClick={onClick} item={item} index={index} key={item.id} />
          ))}
          {provided.placeholder}
        </ListContainer>
      )}
    </Droppable>
  );
};

export default Column;

const ListContainer = styled.div<{ $isDraggingOver: boolean }>`
  margin: 10px;
  background-color: ${({ $isDraggingOver }) => ($isDraggingOver ? '#cfd5ec' : '#e2e6f6')};
  padding: 10px;
  width: 300px;
  min-height: 500px;
  border-radius: 10px;
  padding-top: 50px;
`;
