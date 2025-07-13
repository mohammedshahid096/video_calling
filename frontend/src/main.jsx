// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextStates from '@context/ContextStates';
import SocketContext from './providers/SocketContext';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ContextStates>
    <SocketContext>
      <App />
    </SocketContext>
  </ContextStates>
  // </StrictMode>
);
