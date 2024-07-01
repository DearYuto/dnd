import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Droppable, Id } from 'react-beautiful-dnd';

import type { Column } from '@/types/column';

import Item from './Item';

type Props = {
  column: Column;
  droppableId: number;
};

const Column = ({ droppableId, column }: Props) => {
  const [selectedItemIds, setSelectedItemIds] = useState<Id[]>([]);

  // TODO 배경 눌렀을 때 전체 선택 해제
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.currentTarget !== e.target) return;

      setSelectedItemIds(() => []);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
  const onClick = (item: Item) => () => {
    setSelectedItemIds((prevIds) => {
      if (prevIds.includes(item.id)) {
        return prevIds.filter((id) => id !== item.id);
      }

      return [...prevIds, item.id];
    });
  };

  // TODO 선택된 아이템이 여러개 인 경우, 선택하지 않은 아이템을 이동하려고 하면 이동 불가하게 처리하기
  const isDragDisabled = (item: Item) => {
    return selectedItemIds.length > 1 && !selectedItemIds.includes(item.id);
  };

  console.log(selectedItemIds);

  return (
    <Droppable droppableId={`column${droppableId}`}>
      {(provided, snapshot) => (
        <ListContainer
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
