import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import 'remixicon/fonts/remixicon.css';
import {store  } from "./redux/store.js";
import SocketContex from './Socket/SocketContex.jsx'
//import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <>
   <SocketContex>
  <Toaster />
  <Provider store={store}>
  <App />
  </Provider>
  </SocketContex>
  </>

  //</React.StrictMode>,
);
