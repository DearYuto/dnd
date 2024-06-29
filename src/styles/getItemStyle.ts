import { DraggingState, NotDraggingStyle } from 'react-beautiful-dnd';
import { GRID } from '../constants/style';

type Props = {
  isDragging: boolean;
  draggableStyle: DraggingState | NotDraggingStyle | undefined | React.CSSProperties;
};

export const getItemStyle = ({ isDragging, draggableStyle }: Props) => ({
  userSelect: 'none' as React.CSSProperties['userSelect'],
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});
