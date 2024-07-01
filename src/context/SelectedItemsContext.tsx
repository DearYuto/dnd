import React, { createContext, useMemo, useState } from 'react';
import type { Id } from 'react-beautiful-dnd';

type SelectedItemsUpdateContextProps = React.Dispatch<React.SetStateAction<Id[]>>;

type Props = {
  children: React.ReactNode;
};

const SelectedItemsContext = createContext<Id[] | null>(null);
const SelectedItemsUpdateContext = createContext<SelectedItemsUpdateContextProps | null>(null);

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

export { SelectedItemsContext, SelectedItemsUpdateContext };
