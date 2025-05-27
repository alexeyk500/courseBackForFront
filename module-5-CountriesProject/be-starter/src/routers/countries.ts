import {Router} from 'express';
import { getAllCountries, getCountryByName } from "../controllers/countries";
import publicCache from '../middlewares/publicCache';

const countriesRouter = Router();

countriesRouter.get('/', [publicCache], getAllCountries);
countriesRouter.get('/name/:name', [publicCache], getCountryByName);

export default countriesRouter;