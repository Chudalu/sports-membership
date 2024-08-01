import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const ClassValidator = (type: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const input = plainToInstance(type, req.body);

    validate(input).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: any) => Object.values(error.constraints)).join(', ');
        res.status(400).json({ message });
      } else {
        next();
      }
    });
  };
};
