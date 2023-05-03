import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import RouteChangeTracker from './routes/RouteChangeTracker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteChangeTracker />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
