import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from './constants';

export const parseToken = (token: string): Record<string, any> | null => {
  try {
    const decoded = verify(token, TOKEN_SECRET);
    return typeof decoded === 'object' ? decoded : null;
  } catch (e) {
    return null;
  }
};

export const getUserId = (token: string): string | null => {
  const parsedToken = parseToken(token);

  return parsedToken?.userId ?? null;
};
