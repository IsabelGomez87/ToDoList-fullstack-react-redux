import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store/store';
import Task from './components/task/Task';

function App() {
  return (

    <Provider store={store()}>
      <header>
        <h2>To Do List</h2>
      </header>
      <main>
        <Task />
      </main>
    </Provider>

  );
}

export default App;
