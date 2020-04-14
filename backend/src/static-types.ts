import { EntityManager, Connection } from 'typeorm';
import { Request, Response } from 'express';

interface AuthToken {
  userId: string | null;
  exp: number;
}
export interface Context {
  manager: EntityManager;
  connection: Connection;
  req: Request;
  res: Response;
  cookies: { [key: string]: string };
  userId?: string;
  token?: AuthToken;
}
