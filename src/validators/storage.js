import { check, validationResult } from 'express-validator';
import {validateResults} from '../utils/handlerValidator.js'

export const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];