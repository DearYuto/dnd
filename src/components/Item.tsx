import { Draggable } from 'react-beautiful-dnd';
import { getItemStyle } from '@/styles/getItemStyle';
import { Item } from '@/types/item';

type Props = {
  item: Item;
  index: number;
};

const Item = ({ item, index }: Props) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle({
            draggableStyle: provided.draggableProps.style,
            isDragging: snapshot.isDragging,
          })}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};

export default Item;
