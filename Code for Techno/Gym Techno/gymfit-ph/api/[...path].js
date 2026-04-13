import { handleRequest } from '../backend/handler.js';

export default async function handler(req, res) {
  return handleRequest(req, res);
}
