import { check, validationResult } from 'express-validator';
import {validateResults} from '../utils/handlerValidator.js'

export const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];