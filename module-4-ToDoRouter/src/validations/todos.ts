import { celebrate, Joi, Segments } from 'celebrate'

export const validateCreateTodo = celebrate({
  [Segments.BODY]: {
    title: Joi.string().required().min(2),
    completed: Joi.boolean().required()
  }
});

export const validateUpdateTodo = celebrate({
  [Segments.BODY]: {
    id: Joi.number().required(),
    title: Joi.string().required().min(2),
    completed: Joi.boolean().required()
  }
});