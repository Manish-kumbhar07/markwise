import type { IncomingMessage, ServerResponse } from 'node:http';
import handler from './index.ts';

export default async function catchAll(req: IncomingMessage, res: ServerResponse): Promise<void> {
  await handler(req, res);
}

