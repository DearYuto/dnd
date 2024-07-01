import { GRID } from '../constants/style';

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#c5ddff' : '#ddd',
  padding: GRID,
  width: 250,
});
