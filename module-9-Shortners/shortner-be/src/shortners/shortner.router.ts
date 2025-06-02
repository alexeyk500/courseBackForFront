import { Router } from 'express';
import {
  createShortLink,
  deleteShortLink,
  getAllShortLinksByUser,
  updateShortLink,
} from './shortner.controller';

const shortnerRouter = Router();

shortnerRouter.post('/shortners', createShortLink);
shortnerRouter.get('/shortners', getAllShortLinksByUser);
shortnerRouter.patch('/shortners/:id', updateShortLink);
shortnerRouter.delete('/shortners/:id', deleteShortLink);

export default shortnerRouter;
