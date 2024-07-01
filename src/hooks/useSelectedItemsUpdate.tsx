import { useContext } from 'react';
import { SelectedItemsUpdateContext } from '../context/SelectedItemsContext';
import { Id } from 'react-beautiful-dnd';

type SelectedItemsUpdateContextProps = React.Dispatch<React.SetStateAction<Id[]>>;

export const useSelectedItemsUpdate = (): SelectedItemsUpdateContextProps => {
  const context = useContext(SelectedItemsUpdateContext);

  if (context === null) {
    throw new Error('SelectedItemsUpdateContext가 존재하지 않습니다.');
  }

  return context;
};
