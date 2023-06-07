import React, { useEffect, useState } from 'react';
import { SocketContext } from './SocketContext';
import socket from './Socket';

const SocketProvider = ({ children }) => {
  const [alert, setAlert] = useState(false);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [alertEvents, setAlertEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log('connected');
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('disconnected');
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log('msgs received', value);
      setAlertEvents((prev) => [value, ...prev]);
    }

    function onRemotePlayerMovementEvent(value) {
      console.log('Remote player movement:', value);
    }

    function onLocalPlayerMovementEvent(value) {
      console.log('Local player movement:', value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('test', onFooEvent);
    // test movements
    socket.on('remote-player-movement', onRemotePlayerMovementEvent);
    socket.on('local-player-movement', onLocalPlayerMovementEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('test', onFooEvent);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, alert, setAlert, alertEvents, setAlertEvents }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
