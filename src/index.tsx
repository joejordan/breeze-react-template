import { StrictMode } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import '@/styles/app.css';
import { router } from './routes';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
