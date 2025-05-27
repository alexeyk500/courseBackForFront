import {Router} from 'express';
import { getAllCountries, getCountryByCodes, getCountryByName } from "../controllers/countries";

const countriesRouter = Router();

countriesRouter.get('/', getAllCountries);
countriesRouter.get('/name/:name', getCountryByName);
countriesRouter.get('/alpha', getCountryByCodes);

export default countriesRouter;