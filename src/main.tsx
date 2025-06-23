import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // NEW IMPORTS
import { AuthProvider } from './context/AuthContext.ts';

const queryClient = new QueryClient(); // Create a new QueryClient instance

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)