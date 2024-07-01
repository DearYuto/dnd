import React, { createContext, useContext, useMemo, useState } from 'react';
import { Id } from 'react-beautiful-dnd';

type SelectedItemsContextProps = {
  selectedItemIds: Id[];
  setSelectedItemIds: React.Dispatch<React.SetStateAction<Id[]>>;
};

type Props = {
  children: React.ReactNode;
};

const SelectedItemsContext = createContext<SelectedItemsContextProps | null>(null);

export const SelectedItemsProvider = ({ children }: Props) => {
  const [selectedItemIds, setSelectedItemIds] = useState<Id[]>([]);

  const value = useMemo(() => ({ selectedItemIds, setSelectedItemIds }), [selectedItemIds]);

  return <SelectedItemsContext.Provider value={value}>{children}</SelectedItemsContext.Provider>;
};

export const useSelectedItems = (): SelectedItemsContextProps => {
  const context = useContext(SelectedItemsContext);

  if (!context) {
    throw new Error('context가 존재하지 않습니다.');
  }

  return context;
};
