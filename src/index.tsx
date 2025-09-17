import { StrictMode } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import '@/styles/app.css';
import { ThemeProvider } from '@/contexts/theme-context';
import { router } from './routes';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
