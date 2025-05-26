import { celebrate, Joi, Segments } from "celebrate";

export const validateUrlId = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  }
});