import './scss/normalize.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.querySelector('#root'));
});
