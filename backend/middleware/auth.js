import {validationResult, check }  from "express-validator";

export const validateUserInput = () => {
    return [
        check("username", "username is required").isString(),
        check("email", "email is required").isString(),
        check("password", "Password with 6 or more characters required").isLength({
          min: 6,
        }),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ message: errors.array() });
        }
        next();
      }
    ];
  };

 export const validateSignInInput = () => {
    return [
        check("username", "username is required").isString(),
        check("password", "Password with 6 or more characters required").isLength({
          min: 6,
        }),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ message: errors.array() });
        }
        next();
      }
    ];
  };

 //export default validateUserInput
 //module.exports = { validateSignInInput, validateSignInInput}