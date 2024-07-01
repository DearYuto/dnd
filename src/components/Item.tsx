import { Draggable, DraggingState, NotDraggingStyle } from 'react-beautiful-dnd';
import styled from 'styled-components';

import type { Item } from '@/types/item';

import { useSelectedItemsValue } from '@/hooks/useSelectedItemsValue';
import { afterStyles, conditionalStyles, getMoveNotAllowedStyles } from '@/styles/global';

type Props = {
  item: Item;
  index: number;
  isSelected: boolean;
  moveNotAllowed: boolean;
  onClick: (item: Item) => () => void;
  isDragDisabled: (item: Item) => boolean;
};

const Item = ({ item, index, onClick, moveNotAllowed, isSelected, isDragDisabled }: Props) => {
  const selectedItemIds = useSelectedItemsValue();

  return (
    <Draggable
      key={item.id}
      draggableId={item.id}
      isDragDisabled={isDragDisabled(item)}
      index={index}
    >
      {(provided, snapshot) => (
        <DraggableItem
          className="item"
          onClick={onClick(item)}
          $moveNotAllowed={moveNotAllowed}
          $isSelected={isSelected}
          $isDragging={snapshot.isDragging || selectedItemIds.includes(item.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.content}
        </DraggableItem>
      )}
    </Draggable>
  );
};

export default Item;

type DraggableItemProps = {
  $isDragging: boolean;
  $isSelected: boolean;
  $moveNotAllowed: boolean;
  draggableStyle?: DraggingState | NotDraggingStyle | undefined | React.CSSProperties;
};

const DraggableItem = styled.div<DraggableItemProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin: 0 0 8px 0;
  min-height: 100px;
  background-color: white;
  color: #3b3c4b;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  ${({ $isDragging }) => conditionalStyles($isDragging)};
  ${({ $moveNotAllowed }) => $moveNotAllowed && getMoveNotAllowedStyles()};
  ${({ draggableStyle }) => ({ ...draggableStyle })};

  &::after {
    ${({ $isDragging, $isSelected }) => afterStyles($isDragging, $isSelected)};
  }
`;
