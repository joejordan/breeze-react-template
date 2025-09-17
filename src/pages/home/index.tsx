import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    </div>
  );
}

export default HomePage;
