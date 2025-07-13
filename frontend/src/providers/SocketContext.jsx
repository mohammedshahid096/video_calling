import React, { useMemo, useEffect, createContext, memo, useContext } from 'react';
import { BASE_URL } from '@/services/config';
import Context from '@/context/context';
import { io } from 'socket.io-client';
import { user_emit_listeners } from '@/constants/socket.constants';

export const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};
const SocketProvider = ({ children }) => {
  const {
    authState: { profileDetails },
  } = useContext(Context);

  const socket = useMemo(() => {
    try {
      const socketInstance = io(BASE_URL, {
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
      });
      return socketInstance;
    } catch (error) {
      console.error('Socket initialization failed:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!profileDetails || !socket) return;

    const handleConnect = () => {
      console.log('Socket connected');
      socket.emit(user_emit_listeners.joinRoom, profileDetails._id);
    };

    const handleDisconnect = () => {
      console.log('Socket disconnected');
    };

    const handleError = (error) => {
      console.error('Socket error:', error);
    };

    // If already connected, join room immediately
    if (socket.connected) {
      handleConnect();
    }

    // Set up event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);

    return () => {
      if (!socket) return;

      // Clean up listeners
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);

      // Only disconnect if no other parts of the app need the socket
      // socket.disconnect();
    };
  }, [profileDetails, socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default memo(SocketProvider);
