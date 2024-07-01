import { useContext } from 'react';
import { Id } from 'react-beautiful-dnd';
import { SelectedItemsContext } from '../context/SelectedItemsContext';

export const useSelectedItemsValue = (): Id[] => {
  const context = useContext(SelectedItemsContext);

  if (context === null) {
    throw new Error('SelectedItemsValueContext가 존재하지 않습니다.');
  }

  return context;
};
