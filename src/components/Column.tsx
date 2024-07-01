import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import type { Column } from '@/types/column';

import Item from './Item';
import { useSelectedItemsUpdate } from '@/hooks/useSelectedItemsUpdate';
import { useSelectedItemsValue } from '@/hooks/useSelectedItemsValue';

type Props = {
  column: Column;
  droppableId: number;
};

const Column = ({ droppableId, column }: Props) => {
  const selectedItemIds = useSelectedItemsValue();
  const setSelectedItemIds = useSelectedItemsUpdate();

  console.log({ selectedItemIds });

  const onClick = (item: Item) => () => {
    setSelectedItemIds((prevIds) => {
      if (prevIds.includes(item.id)) {
        return prevIds.filter((id) => id !== item.id);
      }

      return [...prevIds, item.id];
    });
  };

  const isDragDisabled = (item: Item) => {
    return selectedItemIds.length > 1 && !selectedItemIds.includes(item.id);
  };

  return (
    <Droppable droppableId={`column${droppableId}`}>
      {(provided, snapshot) => (
        <ListContainer
          className="column"
          $isDraggingOver={snapshot.isDraggingOver}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {column.map((item, index) => (
            <Item
              onClick={onClick}
              isSelected={selectedItemIds.includes(item.id)}
              isDragDisabled={isDragDisabled}
              item={item}
              index={index}
              key={item.id}
            />
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
