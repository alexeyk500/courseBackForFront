import { Router } from 'express';
import { getAllCountries, getCountryByName } from '../controllers/countries';
import publicCache from '../middlewares/publicCache';
import redisCache from '../middlewares/redisCache';

const countriesRouter = Router();

countriesRouter.get('/', [publicCache, redisCache(300)], getAllCountries);
countriesRouter.get(
  '/name/:name',
  [publicCache, redisCache(300)],
  getCountryByName,
);

export default countriesRouter;
