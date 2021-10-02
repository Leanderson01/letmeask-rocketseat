import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//importando o firebase para a minha aplicação
import './services/firebase';
//importando o arquivo scss para a minha aplicação
import './styles/global.scss';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
