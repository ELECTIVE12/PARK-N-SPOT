const normalizeOrigin = (origin) => origin?.trim().replace(/\/+$/, '');

const localOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const vercelPreviewPattern = /\.vercel\.app$/;

const envOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.ALLOWED_ORIGINS?.split(',') ?? []),
]
  .map(normalizeOrigin)
  .filter(Boolean);

const allowedOrigins = [
  'https://parknspott.com',
  'https://www.parknspott.com',
  'https://park-n-spot.vercel.app',
  ...envOrigins,
  localOriginPattern,
  vercelPreviewPattern,
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const normalizedOrigin = normalizeOrigin(origin);
  return allowedOrigins.some((entry) =>
    typeof entry === 'string' ? entry === normalizedOrigin : entry.test(normalizedOrigin)
  );
};

module.exports = { allowedOrigins, isAllowedOrigin, normalizeOrigin };
