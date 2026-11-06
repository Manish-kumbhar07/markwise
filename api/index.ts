import type { IncomingMessage, ServerResponse } from 'node:http';
import { apiHandler } from '../src/server/api.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.url && !req.url.startsWith('/api/')) {
    req.url = `/api${req.url.startsWith('/') ? '' : '/'}${req.url}`;
  }
  await apiHandler(req, res);
}

