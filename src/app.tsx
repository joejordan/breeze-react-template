import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from '@tanstack/react-router';
import ErrorBoundary from '@/components/error-boundary';
import HelmetHeader from '@/components/helmet-header';
import { ThemeProvider } from '@/contexts/theme-context';
import { router } from './routes';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HelmetProvider>
          <HelmetHeader />
          <RouterProvider router={router} />
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
