import React from 'react';
import { Provider } from 'react-redux';
import KanbanBoard from './components/KanbanBoard';
import store from './store';

const App = () => (
  <Provider store={store}>
    <KanbanBoard />
  </Provider>
);

export default App;