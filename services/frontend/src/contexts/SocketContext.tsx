import { ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { Socket, io } from 'socket.io-client';

export const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Dimension portal is opening...');
});

socket.on('reconnect', () => {
  console.log('Dimension portal is reforming...');
});

const SocketContext = createContext<Socket>(socket);

type SocketProviderProps = {
  children: ComponentChildren,
};

export const SocketProvider = ({
  children,
}: SocketProviderProps) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};
