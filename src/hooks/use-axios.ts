import { useMemo } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/globals';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Configuration options for the useAxios hook.
 * Extends AxiosRequestConfig to include all standard axios configuration options
 * plus our custom token property.
 */
export type UseAxiosOptions = AxiosRequestConfig & {
  /**
   * Bearer token to use for authentication.
   * If not provided, the hook will automatically attempt to load from:
   * 1. localStorage.getItem('authToken')
   * 2. localStorage.getItem('access_token')
   * 3. sessionStorage.getItem('authToken')
   */
  token?: string;
};

/**
 * Attempts to automatically load a bearer token from common storage locations
 * @returns The found token or undefined
 */
function getStoredToken(): string | undefined {
  if (globalThis.window === undefined)
    return undefined;

  // Try common token storage keys in order of preference
  const tokenKeys = ['authToken', 'access_token', 'token'];

  // First check localStorage
  for (const key of tokenKeys) {
    const token = localStorage.getItem(key);
    if (token)
      return token;
  }

  // Then check sessionStorage
  for (const key of tokenKeys) {
    const token = sessionStorage.getItem(key);
    if (token)
      return token;
  }

  return undefined;
}

/**
 * Custom hook that returns a pre-configured Axios instance for API calls.
 *
 * Features:
 * - Automatically loads bearer tokens from localStorage/sessionStorage
 * - Pre-configured with API base URL from environment variables
 * - Request/response interceptors for consistent authentication handling
 * - Customizable timeout, headers, and other axios options
 *
 * Token Loading Priority:
 * 1. Provided `options.token` parameter
 * 2. localStorage.getItem('authToken')
 * 3. localStorage.getItem('access_token')
 * 4. sessionStorage.getItem('authToken')
 *
 * @param options - Configuration options for the axios instance
 * @returns Configured AxiosInstance ready for API calls
 *
 * @example
 * ```typescript
 * // Basic usage - automatically loads token from storage
 * const axios = useAxios();
 * const users = await axios.get('/users');
 *
 * // With custom token
 * const axios = useAxios({ token: customToken });
 *
 * // With additional configuration
 * const axios = useAxios({
 *   timeout: 15000,
 *   headers: { 'X-Custom-Header': 'value' }
 * });
 * ```
 */
export function useAxios(options: UseAxiosOptions = {}): AxiosInstance {
  const axiosInstance = useMemo(() => {
    // Get token from options or attempt to load from storage
    const token = options.token ?? getStoredToken();

    // Create axios instance with base configuration
    const instance = axios.create({
      baseURL: options.baseURL ?? API_BASE_URL,
      timeout: options.timeout ?? 10_000,
      withCredentials: options.withCredentials ?? false,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Request interceptor to attach bearer token
    instance.interceptors.request.use(
      (config) => {
        // Attach bearer token if available
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      async (error) => {
        throw error;
      },
    );

    // Response interceptor for consistent error handling
    instance.interceptors.response.use(
      (response) => {
        // Return the response data directly for successful requests
        return response;
      },
      async (error) => {
        // Handle common HTTP errors
        if (error.response) {
          // Server responded with error status
          const { status, data } = error.response;

          // Enhance error with more context
          error.message = data?.message ?? error.message;
          error.statusCode = status;

          // Log authentication errors for debugging
          if (status === 401) {
            console.warn('Authentication failed. Token may be expired or invalid.');
          }
        } else if (error.request) {
          // Request was made but no response received
          error.message = 'Network error: Unable to reach the server';
        }

        throw error;
      },
    );

    return instance;
  }, [
    options.token,
    options.baseURL,
    options.timeout,
    options.withCredentials,
    options.headers,
  ]);

  return axiosInstance;
}
