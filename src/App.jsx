import React from 'react';
import './App.css';
import DisplayContainer from './containers/DisplayContainer';
import {Provider} from 'react-redux';
import configureStore from './store';

function App() {
  return (
      <div className="App">
        <Provider store={configureStore()}>
          <DisplayContainer/>
        </Provider>
      </div>
  );
}

export default App;
