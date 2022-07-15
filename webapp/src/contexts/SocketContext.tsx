import { ReactJSXElementChildrenAttribute } from '@emotion/react/types/jsx-namespace';
import { useEffect, useState, createContext } from 'react';

const SOCKET_URL = "ws://test.fr";
const SOCKET_RECONNECTION_TIMEOUT = 3000;
const webSocket = new WebSocket(SOCKET_URL);

export const SocketContext = createContext(webSocket);

export const SocketProvider = (props: ReactJSXElementChildrenAttribute) => {
  const [ws, setWs] = useState<WebSocket>(webSocket);

  useEffect(() => {
    const onClose = () => {
      setTimeout(() => {
        setWs(new WebSocket(SOCKET_URL));
      }, SOCKET_RECONNECTION_TIMEOUT);
    };

    ws.addEventListener('close', onClose);

    return () => {
      ws.removeEventListener('close', onClose);
    };
  }, [ws, setWs]);

  return (
    <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
  );
};

