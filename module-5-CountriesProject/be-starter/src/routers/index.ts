import {Router} from 'express';
import countriesRouter from "./countries";

const appRouter = Router();

appRouter.use('/countries', countriesRouter);

export default appRouter;