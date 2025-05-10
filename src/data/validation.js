import Joi from "joi";

const productSchema = Joi.object({
  type: Joi.string().valid("game", "console").required().messages({
    "any.required": "Type is required",
    "any.only": "Type must be either 'game' or 'console'",
  }),
  title: Joi.string().trim().min(1).required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  description: Joi.string().trim().min(1).required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  image: Joi.string()
    .uri()
    .pattern(/\.(png|jpg|jpeg|gif)$/i)
    .required()
    .messages({
      "string.empty": "Image URL is required",
      "string.uri": "Image URL must be a valid URL",
      "string.pattern.base":
        "Image URL must point to a valid image (png, jpg, jpeg, gif)",
      "any.required": "Image URL is required",
    }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
});

export const validateProduct = (data) => {
  return productSchema.validate(data, { abortEarly: false });
};