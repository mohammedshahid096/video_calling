import { useContext } from 'react';
import SocketContext from '@/providers/SocketContext';

export const useSocket = () => {
  return useContext(SocketContext);
};
