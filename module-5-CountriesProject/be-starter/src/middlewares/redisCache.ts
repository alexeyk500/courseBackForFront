import {Request, Response, NextFunction} from 'express'
import { getFromRedis } from '../redis/redisUtils';
import { RedisCacheError } from '../errors/RedisCacheError';

const redisCache = (ttl = 60) => async (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = req.originalUrl;

  try {
    const cachedData = await getFromRedis(cacheKey);
    if (cachedData) {
      console.log('Used data from redis for key', cacheKey);
      res.send(cachedData);
      return
    }
    res.locals.cacheKey = cacheKey;
    res.locals.ttl = ttl;
    next();
  } catch (err) {
    console.log('RedisCacheError', err);
    next(new RedisCacheError)
  }
}

export default redisCache