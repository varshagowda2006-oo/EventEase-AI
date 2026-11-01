import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { ToastProvider } from './context/ToastContext';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

