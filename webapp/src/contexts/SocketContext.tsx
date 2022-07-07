
import { ReactJSXElementChildrenAttribute } from "@emotion/react/types/jsx-namespace";
import { createContext } from "react";

const ws = new WebSocket('ws://test.fr');

const SocketContext = createContext(ws);

export function SocketProvider({ children }: ReactJSXElementChildrenAttribute) {
  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>
}

export default SocketContext;