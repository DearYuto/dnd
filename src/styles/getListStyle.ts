import { GRID } from '../constants/style';

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: GRID,
  width: 250,
});
