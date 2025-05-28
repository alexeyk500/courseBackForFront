import redisClient from './redisClient';
import { Response } from 'express';

export const saveToRedis = async (key: string, data: any, ttl = 60) => {
  await redisClient.set(
    key as any,
    JSON.stringify(data) as any,
    { XE: ttl } as any,
  );
  console.log('saveToRedis for key', key);
};

export const cacheResponse = async (res: Response, data: any) => {
  if (res.locals.cacheKey) {
    await saveToRedis(res.locals.cacheKey, data, res.locals.ttl);
    console.log('response was saved to redis for key', res.locals.cacheKey);
  }
};

export const getFromRedis = async (key: string) => {
  const data = await redisClient.get(key as any);
  if (data) {
    console.log('getFromRedis for key', key);
    return JSON.parse(data);
  }
  return null;
};
