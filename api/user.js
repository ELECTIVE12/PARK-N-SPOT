const getBackendBaseUrl = () =>
  process.env.USER_BACKEND_URL ||
  process.env.BACKEND_URL ||
  '';

const buildQueryString = (query = {}) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (key === 'path' || value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, String(item)));
      continue;
    }

    params.set(key, String(value));
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
};

const readRequestBody = async (req) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined;
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return chunks.length > 0 ? Buffer.concat(chunks) : undefined;
};

const copyResponseHeaders = (sourceHeaders, res) => {
  sourceHeaders.forEach((value, key) => {
    const lowerKey = key.toLowerCase();

    if (['content-encoding', 'content-length', 'transfer-encoding', 'connection'].includes(lowerKey)) {
      return;
    }

    res.setHeader(key, value);
  });
};

export default async function handler(req, res) {
  const backendBaseUrl = getBackendBaseUrl().replace(/\/+$/, '');

  if (!backendBaseUrl) {
    res.status(500).json({ message: 'USER_BACKEND_URL is not configured.' });
    return;
  }

  const rawPath = req.query.path;
  const pathSegments = Array.isArray(rawPath)
    ? rawPath
    : rawPath
      ? [rawPath]
      : [];

  const targetPath = pathSegments.join('/');
  const targetUrl = `${backendBaseUrl}${targetPath ? `/${targetPath}` : ''}${buildQueryString(req.query)}`;
  const requestBody = await readRequestBody(req);

  const forwardedHeaders = { ...req.headers };
  delete forwardedHeaders.host;
  delete forwardedHeaders.connection;
  delete forwardedHeaders['content-length'];

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: forwardedHeaders,
      body: requestBody,
      redirect: 'manual',
    });

    copyResponseHeaders(response.headers, res);

    const location = response.headers.get('location');
    if (location) {
      res.setHeader('location', location);
    }

    const body = Buffer.from(await response.arrayBuffer());
    res.status(response.status).send(body);
  } catch (error) {
    console.error('User backend proxy error:', error);
    res.status(502).json({
      message: 'User backend is unavailable.',
      error: error.message,
    });
  }
}
