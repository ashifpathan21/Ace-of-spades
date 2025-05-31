import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();
const socket = io(`${import.meta.env.VITE_BASE_URL}`); // change URL as required
const SocketContex = ({ children }) => {
 

  useEffect(() => {
    
  

    socket.on('connect', () => {
      // //('connected to server');
    });
    socket.on('disconnect', () => {
      // //('disconnected to server');
    } );

   
  },[]);



  return (
    <SocketContext.Provider value={ socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContex;
