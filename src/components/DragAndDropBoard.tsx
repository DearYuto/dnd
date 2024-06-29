import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { getItemStyle } from '@/styles/getItemStyle';
import { getListStyle } from '@/styles/getListStyle';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';

const DragAndDropBoard = () => {
  const { columns, onDragEnd } = useDragAndDrop();

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex' }}>
          {columns.map((column, index) => {
            return (
              <Droppable key={`col-${index}`} droppableId={`column${index}`}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {column.map((item, index) => (
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
            );
          })}
        </div>
      </DragDropContext>
    </>
  );
};

export default DragAndDropBoard;
