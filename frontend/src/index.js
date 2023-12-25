import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {KhotianContextProvider} from "./context/khotianContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <KhotianContextProvider>
      <App />
    </KhotianContextProvider>
    
  </React.StrictMode>
);
