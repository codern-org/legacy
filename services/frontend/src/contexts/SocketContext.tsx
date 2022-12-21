import { ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { Socket, io } from 'socket.io-client';

export const socket = io(
  import.meta.env.VITE_WS_URL,
  { withCredentials: true },
);

socket.on('connect', () => {
  console.log('%c🤖 Dimension portal is opening...', 'background-color: black; color: white; font-size: 1.0rem; padding: 0.5rem; border-radius: 0.25rem');
});

socket.on('disconnect', () => {
  console.log('%c🤖 Dimension portal is terminated...', 'background-color: red; color: white; font-size: 1.0rem; padding: 0.5rem; border-radius: 0.25rem');
});

socket.on('reconnect', () => {
  console.log('%c🤖 Dimension portal is reforming...', 'background-color: yellow; color: white; font-size: 1.0rem; padding: 0.5rem; border-radius: 0.25rem');
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
