import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';

ReactDOM.render(
  <React.StrictMode>
    <Header counter={8} time={10} />
  </React.StrictMode>,
  document.getElementById('root'),
);
