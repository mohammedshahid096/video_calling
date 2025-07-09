import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextStates from '@context/ContextStates';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextStates>
      <App />
    </ContextStates>
  </StrictMode>
);
