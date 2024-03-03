import {validationResult, check }  from "express-validator";

export const validateUserInput = () => {
    return [
        check("username", "Username is required with at least 2 character").isString().isLength({
          min: 2
        }),
        check("email", "Email is required").isString().isLength({
          min:5
        }),
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