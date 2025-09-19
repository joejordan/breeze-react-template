import { useEffect, useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [shouldThrowNetworkError, setShouldThrowNetworkError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Demo handlers for testing error boundaries
  const handleJavaScriptError = () => {
    setShouldThrowError(true);
  };

  const handleNotFoundError = () => {
    void router.navigate({ to: '/this-page-does-not-exist' as any });
  };

  const handleStateError = () => {
    // Set state to trigger error on next render
    // This simulates what happens when async errors get converted to sync errors during rendering
    setShouldThrowNetworkError(true);
  };

  // This will trigger the error boundary when shouldThrowError is true
  if (shouldThrowError) {
    throw new Error(
      'Demo JavaScript Error: This error was intentionally triggered to test the ErrorBoundary!',
    );
  }

  // This simulates a state error that gets caught by the error boundary
  // (e.g., when async operations fail and trigger errors during rendering)
  if (shouldThrowNetworkError) {
    throw new Error(
      'Demo State Error: This simulates a synchronous error that might occur when async operations fail and cause errors during component rendering!',
    );
  }

  return (
    <div
      className={`mx-auto my-8 mt-10 w-8/12 rounded border border-gray-200 p-4 text-center shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-none transform transition-all duration-700 ease-out ${isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-8 scale-95'
        }`}
    >
      <h1
        className={`mb-4 text-4xl font-bold transform transition-all duration-500 ease-out delay-200 ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
          }`}
      >
        Welcome
      </h1>
      <p
        className={`my-4 transform transition-all duration-500 ease-out delay-[400ms] ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
          }`}
      >
        <em className="text-lg">Minimal, fast, sensible defaults.</em>
      </p>
      <p
        className={`my-4 text-muted-foreground transform transition-all duration-500 ease-out delay-[600ms] ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
          }`}
      >
        Using Vite, React, TypeScript, Tailwind, and now Tanstack Router.
      </p>
      <div
        className={`mt-6 flex justify-center gap-4 transform transition-all duration-500 ease-out delay-[800ms] ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
          }`}
      >
        <Link
          to="/about"
          className="group relative overflow-hidden rounded bg-blue-500 px-6 py-3 text-white transition-all duration-300 ease-out hover:bg-blue-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-800"
        >
          <span className="relative z-10">Learn More</span>
          <div className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-left"></div>
        </Link>
        <Link
          to="/dashboard"
          className="group relative overflow-hidden rounded bg-green-500 px-6 py-3 text-white transition-all duration-300 ease-out hover:bg-green-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-offset-gray-800"
        >
          <span className="relative z-10">Go to Dashboard</span>
          <div className="absolute inset-0 scale-x-0 bg-gradient-to-r from-green-600 to-green-500 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-left"></div>
        </Link>
      </div>

      {/* Error Boundary Demo Section - Only show in development */}
      {import.meta.env.DEV && (
        <div
          className={`mt-8 rounded border-2 border-dashed border-yellow-400 bg-yellow-50 p-6 dark:border-yellow-500 dark:bg-yellow-900/20 transform transition-all duration-500 ease-out delay-[1000ms] ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
            }`}
        >
          <h2 className="mb-4 text-2xl font-bold text-yellow-800 dark:text-yellow-200">
            ⚠️ Error Boundary Demo
          </h2>
          <p className="mb-4 text-sm text-yellow-700 dark:text-yellow-300">
            <strong>Development Only:</strong>
            {' '}
            These buttons intentionally trigger different types of errors
            to test our error boundary implementation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <button
                type="button"
                onClick={handleJavaScriptError}
                className="w-full rounded bg-red-500 px-4 py-3 text-white transition-all duration-200 hover:bg-red-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                💥 JavaScript Error
              </button>
              <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                Tests React ErrorBoundary
              </p>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleNotFoundError}
                className="w-full rounded bg-orange-500 px-4 py-3 text-white transition-all duration-200 hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                🔍 404 Not Found
              </button>
              <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                Tests Router notFoundComponent
              </p>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleStateError}
                className="w-full rounded bg-purple-500 px-4 py-3 text-white transition-all duration-200 hover:bg-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                ⚡ State Error
              </button>
              <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                Simulates sync errors from async operations
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
