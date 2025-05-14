import Joi from "joi";

const productSchema = Joi.object({
  type: Joi.string().valid("game", "console").required().messages({
    "any.required": "Please select a type",
    "any.only": "Please choose either 'game' or 'console' as the type",
    "string.empty": "Please select a type"
  }),
  title: Joi.string().trim().min(1).required().messages({
    "string.empty": "Please enter a title",
    "any.required": "Please enter a title",
  }),
  description: Joi.string().trim().min(1).required().messages({
    "string.empty": "Please write a description",
    "any.required": "Please write a description",
  }),
  image: Joi.string()
    .uri()
    .pattern(/\.(png|jpg|jpeg|jpg|gif|webp|tiff|bmp|svg|avif)$/i)
    .required()
    .messages({
      "string.empty": "Please provide an image URL",
      "string.uri": "Please enter a valid image URL",
      "string.pattern.base":
        "Please use an image URL ending with png, jpg, jpeg, gif, webp, tiff, bmp, svg, or avif",
      "any.required": "Please provide an image URL",
    }),
  price: Joi.number().positive().required().messages({
    "number.base": "Please enter a valid number for the price",
    "number.positive": "Please enter a positive number for the price",
    "any.required": "Please enter a price",
  }),
});

export const validateProduct = (data) => {
  return productSchema.validate(data, { abortEarly: false });
};