const USER_LOCAL_API_URL = 'http://localhost:5000';
const USER_PROD_API_URL = 'https://park-n-spot-production.up.railway.app';
const ADMIN_LOCAL_API_URL = 'http://localhost:5001';
const ADMIN_PROD_API_URL = 'https://incredible-adventure-production.up.railway.app';

const isBrowser = typeof window !== 'undefined';
const isLocalHost =
  isBrowser &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);
const preferLocalApi =
  isLocalHost &&
  import.meta.env.VITE_USE_REMOTE_API !== 'true';

const normalizeUrl = (url?: string) => url?.trim().replace(/\/+$/, '');

const isLocalUrl = (url: string) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(url);

function resolveApiUrl(
  configuredUrl: string | undefined,
  localUrl: string,
  productionUrl: string
) {
  const normalizedUrl = normalizeUrl(configuredUrl);

  if (preferLocalApi) {
    return localUrl;
  }

  if (normalizedUrl) {
    // Ignore localhost values when the app is running on a deployed domain.
    if (!isLocalHost && isLocalUrl(normalizedUrl)) {
      return productionUrl;
    }

    return normalizedUrl;
  }

  return isLocalHost ? localUrl : productionUrl;
}

export const API_URL = resolveApiUrl(
  import.meta.env.VITE_API_URL,
  USER_LOCAL_API_URL,
  USER_PROD_API_URL
);

export const ADMIN_API_URL = resolveApiUrl(
  import.meta.env.VITE_ADMIN_API_URL,
  ADMIN_LOCAL_API_URL,
  ADMIN_PROD_API_URL
);
