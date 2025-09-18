import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from '@tanstack/react-router';
import HelmetHeader from '@/components/helmet-header';
import { ThemeProvider } from '@/contexts/theme-context';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <HelmetHeader />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  );
}
