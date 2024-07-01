import DragAndDropBoard from './components/DragAndDropBoard';
import { SelectedItemsProvider } from './context/SelectedItemsContext';

import './global.css';

function App() {
  return (
    <SelectedItemsProvider>
      <DragAndDropBoard />
    </SelectedItemsProvider>
  );
}

export default App;
