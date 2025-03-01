import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import 'remixicon/fonts/remixicon.css';
import {store  } from "./redux/store.js";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
  <Provider store={store}>
  <App />
  </Provider>
    

  </React.StrictMode>,
);
