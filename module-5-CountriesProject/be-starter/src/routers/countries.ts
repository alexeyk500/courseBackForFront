import {Router} from 'express';
import { getAllCountries, getCountryByName } from "../controllers/countries";

const countriesRouter = Router();

countriesRouter.get('/', getAllCountries);
countriesRouter.get('/name/:name', getCountryByName);

export default countriesRouter;