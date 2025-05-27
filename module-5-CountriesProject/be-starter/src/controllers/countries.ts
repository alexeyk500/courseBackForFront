import {Request, Response, NextFunction} from 'express';
import { transformCountry } from '../utils/transformCountry';
import { NotFoundError } from '../errors/NotFoundError';
import { BASE_URL } from '../constants/urlsContants';
import { getNeighbors } from '../utils/getNeighbors';
import { transformAllCountries } from '../utils/transformAllCountries';
import { cacheResponse } from '../redis/redisUtils';

export const getAllCountries = async (req: Request, res: Response) => {
  const result = await fetch(BASE_URL + 'all?fields=name,capital,flags,population,region');
  const data = await result.json() as any[];
  const transformedAllCountries = transformAllCountries(data)
  await cacheResponse(res, transformedAllCountries);
  res.send(transformedAllCountries)
}

export const getCountryByName = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.params.name
  const result = await fetch(BASE_URL + 'name/' + name);
  const data = await result.json();

  const country = data[0];
  if(!country) {
    return next(new NotFoundError('Country not found'))
  }

  const neighborsCodes = country.borders?.join(',');
  const neighbors = neighborsCodes ? await getNeighbors(neighborsCodes) : [] ;

  const preparedCountry = transformCountry(country) as any;
  preparedCountry.neighbors = neighbors

  await cacheResponse(res, preparedCountry);
  res.send(preparedCountry)
}