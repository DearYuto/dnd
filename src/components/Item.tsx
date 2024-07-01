import { Draggable, DraggingState, NotDraggingStyle } from 'react-beautiful-dnd';
import { Item } from '@/types/item';
import styled from 'styled-components';
import { GRID } from '@/constants/style';

type Props = {
  item: Item;
  index: number;
  isSelected: boolean;
  onClick: (item: Item) => () => void;
  isDragDisabled: (item: Item) => boolean;
};

const Item = ({ item, index, onClick, isSelected, isDragDisabled }: Props) => {
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
          $isSelected={isSelected}
          $isDragging={snapshot.isDragging}
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

const DraggableItem = styled.div<{
  $isDragging: boolean;
  $isSelected: boolean;
  draggableStyle?: DraggingState | NotDraggingStyle | undefined | React.CSSProperties;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  opacity: ${({ $isDragging }) => ($isDragging ? '0.6' : '1')};
  border: ${({ $isDragging }) => ($isDragging ? '1px solid #8d9fd9' : '1px solid #d2d7eb')};
  margin: 0 0 ${GRID}px 0;
  min-height: 100px;
  background-color: white;
  color: #3b3c4b;
  font-weight: ${({ $isDragging }) => ($isDragging ? 'bold' : 'normal')};
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${({ $isDragging }) => ($isDragging ? '4px 4px 20px #70738050' : 'none')};

  ${({ draggableStyle }) => ({ ...draggableStyle })};

  &::after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${({ $isDragging, $isSelected }) => getItemColor($isDragging, $isSelected)};
    color: white;
    padding: 5px;
  }
`;

const getItemColor = (isDragging: boolean, isSelected?: boolean): string => {
  if (isSelected) return '#9dffe2';
  if (isDragging) return '#8d9fd9';

  return '#cdd7f8';
};
