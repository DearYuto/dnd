import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { getListStyle } from './styles/getListStyle';
import { getItemStyle } from './styles/getItemStyle';

type Item = {
  id: string;
  content: string;
};

type Reorder = (list: Item[], startIndex: number, endIndex: number) => Item[];
type OnDragEnd = (result: DropResult) => void;

function App() {
  const getItems = (count: number): Item[] =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  const [items, setItems] = useState<Item[]>(getItems(10));

  const reorder: Reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd: OnDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const newItems = reorder(items, result.source.index, result.destination.index);

      setItems(newItems);
    },
    [items]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
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
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
