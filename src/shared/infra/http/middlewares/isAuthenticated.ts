import { verify } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { ITokenPayload } from './ITokenPayload';

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

export { isAuthenticated };
