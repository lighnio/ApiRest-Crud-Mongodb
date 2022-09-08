import { check, validationResult } from 'express-validator';
import {validateResults} from '../utils/handlerValidator.js'

export const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty(),
    // .isLength({min: 5, max: 90})
    check("album")
    .exists()
    .notEmpty(),
    check("cover")
    .exists()
    .notEmpty(),
    check("artist")
    .exists()
    .notEmpty(),
    check("artist.name")
    .exists()
    .notEmpty(),
    check("artist.nationality")
    .exists()
    .notEmpty(),
    check("duration")
    .exists()
    .notEmpty(),
    check("duration.start")
    .exists()
    .notEmpty(),
    check("duration.end")
    .exists()
    .notEmpty(),
    check("mediaId")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

export const validatorRegister = [
    check("name")
    .exists()
    .notEmpty()
    .isLength({min: 3, max: 99}),
    check("age")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("password")
    .exists()
    .notEmpty()
    .isLength({min: 3, max: 15}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => validateResults(req, res, next)
];

export const validatorLogin = [
    check("password")
    .exists()
    .notEmpty()
    .isLength({min: 3, max: 15}),
    check("email")
    .exists()
    .notEmpty()
    .isEmail(),
    (req, res, next) => validateResults(req, res, next)
];