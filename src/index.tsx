import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/main.css';
import App from './App';
import * as Redux from 'react-redux';
import store from './redux/store';

const rootElement = (
  <Redux.Provider store={store}>
    <App />
  </Redux.Provider>
)

ReactDOM.render(rootElement, document.getElementById('root'));
