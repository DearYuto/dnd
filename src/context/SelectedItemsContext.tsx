import React, { createContext, useContext, useMemo, useState } from 'react';
import { Id } from 'react-beautiful-dnd';

type SelectedItemsUpdateContextProps = React.Dispatch<React.SetStateAction<Id[]>>;

type Props = {
  children: React.ReactNode;
};

const SelectedItemsContext = createContext<Id[] | null>(null);
const SelectedItemsUpdateContext = createContext<SelectedItemsUpdateContextProps | null>(
  () => null
);

export const SelectedItemsProvider = ({ children }: Props) => {
  const [selectedItemIds, setSelectedItemIds] = useState<Id[]>([]);

  const value = useMemo(() => selectedItemIds, [selectedItemIds]);
  const update = useMemo(() => setSelectedItemIds, [setSelectedItemIds]);

  return (
    <SelectedItemsContext.Provider value={value}>
      <SelectedItemsUpdateContext.Provider value={update}>
        {children}
      </SelectedItemsUpdateContext.Provider>
    </SelectedItemsContext.Provider>
  );
};

export const useSelectedItemsValue = (): Id[] => {
  const context = useContext(SelectedItemsContext);

  if (context === null) {
    throw new Error('SelectedItemsValueContext가 존재하지 않습니다.');
  }

  return context;
};

export const useSelectedItemsUpdate = (): SelectedItemsUpdateContextProps => {
  const context = useContext(SelectedItemsUpdateContext);

  if (context === null) {
    throw new Error('SelectedItemsUpdateContext가 존재하지 않습니다.');
  }

  return context;
};
