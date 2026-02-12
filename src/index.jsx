import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Приложение from './Приложение';  // ИМПОРТ С РУССКИМ НАЗВАНИЕМ!

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Приложение />
    </BrowserRouter>
  </React.StrictMode>
);